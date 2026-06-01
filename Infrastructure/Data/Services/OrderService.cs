using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Common.Result;
using Core.DTOs.Order;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Mapster;

namespace Infrastructure.Data.Services;

public class OrderService(IUnitOfWork unitOfWork, ICartService cartService) : IOrderService
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly ICartService _cartService = cartService;

    public async Task<Result<Guid>> CreateOrder(CreateOrderRequest orderDto, string bayerEmail, CancellationToken cancellationToken)
    {

        var cart = await _cartService.GetCartAsync(orderDto.cartId);
        if (cart.IsFailure)
            return Result.Failure<Guid>(OrderErrors.CartNotDefined);

        if (string.IsNullOrEmpty(cart.Value.PaymentIntentId))
            return Result.Failure<Guid>(OrderErrors.PaymentNotDefined);

        var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(cart.Value.DeliveryMethodId.GetValueOrDefault(), cancellationToken);
        if (deliveryMethod is null)
            return Result.Failure<Guid>(OrderErrors.DeliveryMethodNotDefined);

        var orderItems = new List<OrderItem>();
        foreach (var item in cart.Value.Items)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(item.ProductId, cancellationToken);

            if (product is null)
                return Result.Failure<Guid>(OrderErrors.PorductNotDefined);

            orderItems.Add(new()
            {
                ItemOrdered = new ProductItemOrdered
                {
                    ProdcutName = product.Name,
                    ProdcutId = product.Id,
                    PictureUrl = product.PictureUrl
                },
                Quantity = item.Quantity,
                Price = product.Price
            });
        }

        var order = new Order
        {
            OrderItems = orderItems,
            ShippingAddress = orderDto.ShippingAddress,
            DeliveryMethod = deliveryMethod,
            SubTotal = orderItems.Sum(x => x.Price * x.Quantity),
            PaymentSummary = orderDto.PaymentSummary,
            PaymentIntentId = cart.Value.PaymentIntentId,
            OrderStatus = OrderStatus.Pending,
            BayerEmail = bayerEmail,
        };

        _unitOfWork.Repository<Order>().Add(order);
        if (await _unitOfWork.SaveChangesAsync())
            return Result.Success(order.Id);

        else
        {
            return Result.Failure<Guid>(new Error("Exception", "Error in creating Order"));
        }

    }

    public async Task<Result<CreateOrderResponse>> GetOrdersById(ISpecification<Order> specification, CancellationToken cancellationToken)
    {
        var res = await _unitOfWork.Repository<Order>().GetByIdAsync(specification, cancellationToken);

        return res is null ? Result.Failure<CreateOrderResponse>(OrderErrors.CartNotDefined) : Result.Success((CreateOrderResponse)res);
    }
    public async Task<Result<List<CreateOrderResponse>>> GetUserOrders(ISpecification<Order> specification, CancellationToken cancellationToken)
    {
        var res = await _unitOfWork.Repository<Order>().GetAllAsync(specification, cancellationToken);

        return res is null ? Result.Failure<List<CreateOrderResponse>>(OrderErrors.CartNotDefined)
            : Result.Success(res.Select(r => (CreateOrderResponse)r).ToList());
    }
}
