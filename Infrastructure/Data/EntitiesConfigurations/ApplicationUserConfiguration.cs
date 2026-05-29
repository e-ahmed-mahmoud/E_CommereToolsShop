using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.EntitiesConfigurations;

public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder.Property(x => x.FirstName).IsRequired();
        builder.Property(x => x.LastName).IsRequired();

        builder.OwnsOne(x => x.Address, address =>
        {
            address.ToTable("UserAddresses");

            address.Property(a => a.Country).IsRequired().HasMaxLength(100);
            address.Property(a => a.City).IsRequired().HasMaxLength(100);
            address.Property(a => a.Line1).IsRequired().HasMaxLength(200);
            address.Property(a => a.PostalCode).IsRequired().HasMaxLength(50);
        });

    }
}
