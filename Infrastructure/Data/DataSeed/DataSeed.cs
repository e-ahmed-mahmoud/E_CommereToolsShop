using System.Text.Json;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.DataSeed;

public class DataSeed
{
    public async static Task SeedingData(StoreDbContext storeDbContext)
    {
        var hasProduct = await storeDbContext.Products.AnyAsync();
        var hasDelivery = await storeDbContext.DeliveryMethods.AnyAsync();
        if (hasDelivery && hasProduct)
            return;

        if (!hasProduct)
        {
            var data = await File.ReadAllTextAsync("../Infrastructure/Data/DataSeed/products.json");
            if (string.IsNullOrEmpty(data))
                return;
            var products = JsonSerializer.Deserialize<List<Product>>(data);

            await storeDbContext.Products.AddRangeAsync(products!);
        }
        if (!hasDelivery)
        {
            var data = await File.ReadAllTextAsync("../Infrastructure/Data/DataSeed/delivery.json");
            if (string.IsNullOrEmpty(data))
                return;
            var deliveries = JsonSerializer.Deserialize<List<DeliveryMethod>>(data);

            await storeDbContext.DeliveryMethods.AddRangeAsync(deliveries!);
        }
        await storeDbContext.SaveChangesAsync();
    }

}
