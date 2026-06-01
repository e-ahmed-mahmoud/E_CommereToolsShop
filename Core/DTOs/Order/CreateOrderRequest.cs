using System.ComponentModel.DataAnnotations;
using Core.Entities.OrderAggregate;

namespace Core.DTOs.Order;

public class CreateOrderRequest
{
    [Required]
    public string cartId { get; set; } = string.Empty;

    [Required]
    public ShippingAddress ShippingAddress { get; set; } = default!;
    [Required]
    public PaymentSummary PaymentSummary { get; set; } = default!;
    [Required]
    public Guid DeliveryMethodId { get; set; }

}
