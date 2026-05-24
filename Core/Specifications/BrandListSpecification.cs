using Core.Entities;

namespace Core.Specifications;

public class BrandListSpecification : BaseSpecification<Product, string>
{
    public BrandListSpecification()
    {
        this.AddSelect(p => p.Brand);
        this.AddDistinct();
    }
}
