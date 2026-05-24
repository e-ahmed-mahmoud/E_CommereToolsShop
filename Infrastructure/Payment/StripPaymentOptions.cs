using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Payment;

public sealed class StripPaymentOptions
{
    public static readonly string SectionName = "StripPayment";

    public string PublishableKey { get; set; } = string.Empty;

    public string SecretKey { get; set; } = string.Empty;
}
