namespace Core.Entities.OrderAggregate;

public class Order : BaseEntity
{
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public required string BayerEmail { get; set; }
    public ShippingAddress ShippingAddress { get; set; } = default!;
    public DeliveryMethod DeliveryMethod { get; set; } = default!;
    public PaymentSummary PaymentSummary { get; set; } = default!;
    public List<OrderItem> OrderItems { get; set; } = default!;
    public decimal SubTotal { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    public required string PaymentIntentId { get; set; }
    public decimal GetTotal() => this.SubTotal + this.DeliveryMethod.Price;

}
