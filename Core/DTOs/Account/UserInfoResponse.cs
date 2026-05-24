namespace Core.DTOs.Account;

public record UserInfoResponse(string FirstName, string LastName, string Email, AddressDto? Address);
