using Core.Common.Result;

namespace Core.Entities;

public class UserErrors
{
    public static Error NotDefinedUser => new("NotDefined", "User not defined");

}
