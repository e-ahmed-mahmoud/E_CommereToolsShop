namespace API.Helpers;

public interface IFileServices
{
    Task<(bool, string)> SaveFileAsync(IFormFile file, CancellationToken cancellationToken);

}
