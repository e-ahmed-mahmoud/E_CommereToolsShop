using Core.DTOs.Account;
using Core.DTOs.Order;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.ValueObjects;
using Mapster;

namespace API.Helpers;

public class MappingConfigurations : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<Address, AddressDto>().TwoWays();
        config.NewConfig<ApplicationUser, UserInfoResponse>().TwoWays();

        // config.NewConfig<OrderItem, OrderItemDto>()
        // .Map(dest => dest.ProductId, src => src.ItemOrdered.ProdcutId)
        // .Map(dest => dest.ProductName, src => src.ItemOrdered.ProdcutName)
        // .Map(dest => dest.PictureUrl, src => src.ItemOrdered.PictureUrl)
        // .Map(dest => dest.Price, src => src.Price)
        // .Map(dest => dest.Quantity, src => src.Quantity);

        // config.NewConfig<Order, OrderCreateResponse>()
        // .Map(dest => dest.OrderId, src => src.Id.ToString())
        // .Map(dest => dest.ShippingPrice, src => src.DeliveryMethod.Price)
        // .Map(dest => dest.DeliveryMethod,
        //     src => src.DeliveryMethod.ShortName)
        // .Map(dest => dest.OrderStatus,
        //     src => src.OrderStatus.ToString())
        // .Map(dest => dest.SubTotal,
        //     src => src.OrderItems.Sum(p => p.Price * p.Quantity))
        // .Ignore(x => x.DeliveryMethod);

    }
}
