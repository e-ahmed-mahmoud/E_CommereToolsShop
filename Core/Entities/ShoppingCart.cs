using Core.ValueObjects;

namespace Core.Entities;

public class ShoppingCart
{
    public required string Id { get; set; }

    public List<CartItem> Items { get; set; } = [];

    public Guid? DeliveryMethodId { get; set; } = null;

    public string? ClientSecert { get; set; }

    public string? PaymentIntentId { get; set; }
}
