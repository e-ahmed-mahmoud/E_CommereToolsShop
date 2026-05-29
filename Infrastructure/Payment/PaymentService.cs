using Core.Common.Result;
using Core.Entities;
using Core.Errors;
using Core.Interfaces;
using Microsoft.Extensions.Options;
using Stripe;

namespace Infrastructure.Payment;

public class PaymentService(IOptions<StripPaymentOptions> options, IUnitOfWork unitOfWork, ICartService cartService) : IPaymentService
{
    private readonly StripPaymentOptions _options = options.Value;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly ICartService _cartService = cartService;

    public async Task<Result<ShoppingCart>> CreateOrUpdatePaymentPayloadAsync(string cardId, CancellationToken cancellationToken)
    {
        StripeConfiguration.ApiKey = _options.SecretKey;

        var cart = (await _cartService.GetCartAsync(cardId)).Value;

        if (cart is null) return Result.Failure<ShoppingCart>(PaymentErrors.InValidPayment);

        var shippingPrice = 0m;

        if (cart.DeliveryMethodId.HasValue)
        {
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(cart.DeliveryMethodId.Value, cancellationToken);

            if (deliveryMethod is null) return Result.Failure<ShoppingCart>(PaymentErrors.InValidPayment);

            shippingPrice = deliveryMethod.Price;
        }

        foreach (var item in cart.Items)
        {
            var product = await _unitOfWork.Repository<Core.Entities.Product>().GetByIdAsync(item.ProductId, cancellationToken);

            if (product is null) return Result.Failure<ShoppingCart>(PaymentErrors.InValidPayment);

            if (product.Price != item.Price)
            {
                item.Price = product.Price;
            }
        }

        var stripePaymentService = new PaymentIntentService();

        PaymentIntent? intent = null;

        if (string.IsNullOrEmpty(cart.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)cart.Items.Sum(item => item.Quantity * (item.Price * 100)) + (long)shippingPrice * 100,
                Currency = "SAR",
                PaymentMethodTypes = ["card"]
            };
            intent = await stripePaymentService.CreateAsync(options);

            cart.PaymentIntentId = intent.Id;
            cart.ClientSecert = intent.ClientSecret;
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = (long)cart.Items.Sum(item => item.Quantity * (item.Price * 100)) + (long)shippingPrice * 100
            };
            intent = await stripePaymentService.UpdateAsync(cart.PaymentIntentId, options);

        }
        await _cartService.SetCartAsync(cart);

        return Result.Success(cart);

    }
}
