using Core.Common.Result;

namespace Core.Errors;

public class PaymentErrors
{
    public static Error InValidPayment => new("invalidPyament", "invalid payment processing");
}
