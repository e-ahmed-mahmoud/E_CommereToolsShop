namespace Core.Entities.OrderAggregate;

public class ShippingAddress
{
    public required string Name { get; set; }
    public required string Country { get; set; }
    public required string City { get; set; }
    public required string Line1 { get; set; }
    public string? PostalCode { get; set; }
}
