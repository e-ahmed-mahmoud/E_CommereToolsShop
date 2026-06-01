using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;

namespace Core.DTOs.Order;

public class CreateOrderResponse
{
    public required Guid OrderId { get; set; }
    public DateTime OrderDate { get; set; }
    public required string BayerEmail { get; set; }
    public required ShippingAddress ShippingAddress { get; set; }
    public required string DeliveryMethod { get; set; }
    public required PaymentSummary PaymentSummary { get; set; }
    public List<OrderItemDto> OrderItems { get; set; } = [];
    public decimal SubTotal { get; set; }
    public required string OrderStatus { get; set; }
    public required string PaymentIntentId { get; set; }
    public decimal ShippingPrice { get; set; }
    public decimal Total { get; set; }

    public static explicit operator CreateOrderResponse(Entities.OrderAggregate.Order order)
    {
        return new CreateOrderResponse
        {
            OrderId = order.Id,
            OrderDate = order.OrderDate,
            BayerEmail = order.BayerEmail,
            ShippingAddress = order.ShippingAddress,
            DeliveryMethod = string.Concat(order.DeliveryMethod.ShortName, " | ", order.DeliveryMethod.Description),
            PaymentSummary = order.PaymentSummary,
            OrderItems = [.. order.OrderItems.Select( p => new OrderItemDto (){ PictureUrl = p.ItemOrdered.PictureUrl ,
            ProductId = p.ItemOrdered.ProdcutId, ProductName = p.ItemOrdered.ProdcutName, Price = p.Price, Quantity = p.Quantity })],
            SubTotal = order.SubTotal,
            OrderStatus = order.OrderStatus.ToString(),
            PaymentIntentId = order.PaymentIntentId,
            ShippingPrice = order.DeliveryMethod.Price,
            Total = order.GetTotal()
        };
    }
}
