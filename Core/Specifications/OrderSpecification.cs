using Core.Entities.OrderAggregate;

namespace Core.Specifications;

public class OrderSpecification : BaseSpecification<Order>
{
    public OrderSpecification(string bayerEmail) : base(b => b.BayerEmail == bayerEmail)
    {
        AddIncluds(x => x.OrderItems);
        AddIncluds(x => x.DeliveryMethod);
        AddOrderByDesc(x => x.OrderDate);
    }
    public OrderSpecification(string bayerEmail, Guid orderId) : base(o => o.BayerEmail == bayerEmail && o.Id == orderId)
    {
        AddIncludsStrings("OrderItems");
        AddIncludsStrings("DeliveryMethod");
    }
}
