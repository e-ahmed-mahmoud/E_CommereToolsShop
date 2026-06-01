using Core.Common.Result;
using Core.DTOs.Order;
using Core.Entities.OrderAggregate;
using Core.Specifications;

namespace Core.Interfaces;

public interface IOrderService
{
    Task<Result<Guid>> CreateOrder(CreateOrderRequest createOrder, string bayerEmail, CancellationToken cancellationToken);

    Task<Result<CreateOrderResponse>> GetOrdersById(ISpecification<Order> specification, CancellationToken cancellationToken);

    Task<Result<List<CreateOrderResponse>>> GetUserOrders(ISpecification<Order> specification, CancellationToken cancellationToken);

}
