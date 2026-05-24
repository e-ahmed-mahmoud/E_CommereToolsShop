namespace Core.DTOs.Product;

public record ProductRespons(string Name, string Description, decimal Price, string PictureUrl, string Type, string Brand, int QuantityInStock);
