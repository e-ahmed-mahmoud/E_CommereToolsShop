namespace Core.Entities.OrderAggregate;

public class ProductItemOrdered
{
    public Guid ProdcutId { get; set; }
    public required string ProdcutName { get; set; }
    public required string PictureUrl { get; set; }
}