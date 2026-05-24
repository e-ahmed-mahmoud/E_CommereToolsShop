using Core.Common.Result;
using Core.Entities;

namespace Core.Interfaces;

public interface IPaymentService
{
    Task<Result<ShoppingCart>> CreateOrUpdatePaymentPayloadAsync(string cardId);
}
