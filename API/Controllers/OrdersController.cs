using API.Helpers;
using Core.Common.Result;
using Core.DTOs.Order;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class OrdersController(IOrderService orderService) : BaseApiController
{
    private readonly IOrderService _orderService = orderService;

    [HttpPost]
    public async Task<ActionResult<Order>> Create(CreateOrderRequest orderRequest, CancellationToken cancellationToken)
    {
        var email = User.GetUserEmail();
        var res = await _orderService.CreateOrder(orderRequest, email, cancellationToken);
        if (res.IsSuccess)
        {
            var spec = new OrderSpecification(email, res.Value);
            var order = await _orderService.GetOrdersById(spec, cancellationToken);
            return CreatedAtAction("GetUserOrder", new { order.Value.OrderId }, order);
        }
        return res.ToProblem(400);
    }

    [HttpGet]
    public async Task<ActionResult<Result<CreateOrderResponse>>> GetUserOrder(CancellationToken cancellationToken)
    {
        var specification = new OrderSpecification(User.GetUserEmail());

        var res = await _orderService.GetUserOrders(specification, cancellationToken);

        return res.IsSuccess ? Ok(res.Value) : res.ToProblem(400);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Result<CreateOrderResponse>>> GetUserOrder(Guid id, CancellationToken cancellationToken)
    {
        var specification = new OrderSpecification(User.GetUserEmail(), id);

        var res = await _orderService.GetOrdersById(specification, cancellationToken);

        return res.IsSuccess ? Ok(res.Value) : res.ToProblem(400);
    }
}
