using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.EntitiesConfigurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.OwnsOne(o => o.ShippingAddress).WithOwner();
        builder.OwnsOne(o => o.PaymentSummary).WithOwner();
        builder.Property(o => o.OrderStatus).HasConversion(s => s.ToString(), s => (OrderStatus)Enum.Parse(typeof(OrderStatus), s));
        builder.Property(x => x.SubTotal).HasColumnType("decimal(18,2)");
        builder.HasMany(o => o.OrderItems).WithOne().OnDelete(DeleteBehavior.Cascade);

        builder.Property(o => o.OrderDate).HasConversion(d => d.ToUniversalTime(), d => DateTime.SpecifyKind(d, DateTimeKind.Utc));
    }
}
