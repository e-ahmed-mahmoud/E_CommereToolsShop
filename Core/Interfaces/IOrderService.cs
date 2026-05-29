using Core.Common.Result;
using Core.DTOs.Order;
using Core.Entities.OrderAggregate;
using Core.Specifications;

namespace Core.Interfaces;

public interface IOrderService
{
    Task<Result<Guid>> CreateOrder(CreateOrderRequest createOrder, string bayerEmail, CancellationToken cancellationToken);

    Task<Result<OrderCreateResponse>> GetOrdersById(ISpecification<Order> specification, CancellationToken cancellationToken);

    Task<Result<List<OrderCreateResponse>>> GetUserOrders(ISpecification<Order> specification, CancellationToken cancellationToken);

}
