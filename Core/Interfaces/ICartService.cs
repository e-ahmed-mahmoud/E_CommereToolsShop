using Core.Common.Result;
using Core.Entities;

namespace Core.Interfaces;

public interface ICartService
{

    Task<Result<ShoppingCart>> GetCartAsync(string key);
    Task<Result<ShoppingCart>> SetCartAsync(ShoppingCart cart);
    Task<Result> DeleteAsync(string key);
}
