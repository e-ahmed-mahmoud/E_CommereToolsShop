namespace Core.Common.Result;

public class OrderErrors
{
    public static Error CartNotDefined => new Error("CartNotDefined", "No Cart defined for this order");
    public static Error PaymentNotDefined => new Error("PaymentNotDefined", "No CarPaymentt defined for this order");
    public static Error DeliveryMethodNotDefined => new Error("DeliveryMethodNotDefined", "No Delivery Method defined for this order");
    public static Error PorductNotDefined => new Error("ProductNotDefined", "No Product defined for this order");
}
