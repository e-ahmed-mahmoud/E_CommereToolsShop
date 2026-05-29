using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;

namespace Core.DTOs.Order;

public class OrderCreateResponse
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
}
