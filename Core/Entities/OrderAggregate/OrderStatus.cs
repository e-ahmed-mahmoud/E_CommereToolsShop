namespace Core.Entities.OrderAggregate;

public enum OrderStatus
{
    Pending, PaymentReceived, PaymentFailed, Delivered, InvalidPayment
}
