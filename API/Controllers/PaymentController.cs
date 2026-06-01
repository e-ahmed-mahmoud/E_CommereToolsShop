using API.SignalR;
using Core.Common.Result;
using Core.DTOs.Order;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Stripe;

namespace API.Controllers;

public class PaymentController(IPaymentService paymentService, IUnitOfWork unitOfWork
    , ILogger<PaymentController> logger, IHubContext<NotificationHub> notificationHub) : BaseApiController
{
    private readonly IPaymentService _paymentService = paymentService;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly ILogger<PaymentController> _logger = logger;

    private readonly IHubContext<NotificationHub> _notificationHub = notificationHub;
    private readonly string _payementSecrets = "whsec_a75688f30fac61ec8b555e65f997321eeda0cb10714e263bd2e32a60c536a3a5";

    [Authorize]
    [HttpPost("{cartId}")]
    public async Task<ActionResult<Result<ShoppingCart>>> CreateOrUpdatePaymentIntent([FromRoute] string cartId, CancellationToken cancellationToken)
    {
        var res = await _paymentService.CreateOrUpdatePaymentPayloadAsync(cartId, cancellationToken);
        return res.IsSuccess ? Ok(res.Value) : res.ToProblem(400);
    }

    [HttpGet("delivery-methods")]
    [Authorize]
    public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods(CancellationToken cancellationToken)
    {
        return Ok(await _unitOfWork.Repository<DeliveryMethod>().GetAllAsync(cancellationToken));
    }


    [HttpPost("webhook")]
    public async Task<IActionResult> StripWebhook()
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();

        try
        {
            var stripEvent = GetStripeEvent(json);
            if (stripEvent.Data.Object is not PaymentIntent intent)
                return BadRequest("invalid event data");

            await HandlePaymentIntent(intent);

            return Ok();
        }
        catch (StripeException ex)
        {
            _logger.LogError(ex, "Stripe webhook error");
            return StatusCode(StatusCodes.Status500InternalServerError, "Invalid Stripe request");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Invalid Stripe request");
            return StatusCode(StatusCodes.Status500InternalServerError, "Invalid Stripe request");
        }
    }

    private async Task HandlePaymentIntent(PaymentIntent intent)
    {
        if (intent.Status == "succeeded")
        {
            var spec = new OrderSpecification(intent.Id, true);
            var order = await _unitOfWork.Repository<Order>().GetEntityBySpecificationAsync(spec, default)
                    ?? throw new InvalidOperationException("order not define or paid");

            if (order.OrderStatus == OrderStatus.PaymentReceived)
                return;
            if ((long)order.GetTotal() * 100 != intent.AmountReceived)
                order.OrderStatus = OrderStatus.InvalidPayment;
            else
            {
                order.OrderStatus = OrderStatus.PaymentReceived;
            }
            await _unitOfWork.SaveChangesAsync();

            var connectionId = NotificationHub.GetConnectionIdByEmail(order.BayerEmail);
            if (!string.IsNullOrEmpty(connectionId))
            {
                await _notificationHub.Clients.Client(connectionId).SendAsync("OrderCompleteNotification", (CreateOrderResponse)order);
            }

        }
    }

    private Event GetStripeEvent(string json)
    {
        try
        {
            return EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _payementSecrets);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Invalid Stripe request");
            throw new StripeException("Invalid Stripe request");
        }
    }
}
