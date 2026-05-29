using Core.Common.Result;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;


public class PaymentController(IPaymentService paymentService, IUnitOfWork unitOfWork) : BaseApiController
{
    private readonly IPaymentService _paymentService = paymentService;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

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
}
