using System.Security.Claims;

namespace API.Helpers;

public static class UserExtensions
{
    public static string GetUserEmail(this ClaimsPrincipal user)
    {
        if (user.Identity?.IsAuthenticated == false)
            return "";

        var userEmail = user.FindFirstValue(ClaimTypes.Email);
        return userEmail ?? "";
    }
}
