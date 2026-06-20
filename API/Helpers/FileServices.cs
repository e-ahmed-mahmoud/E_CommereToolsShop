namespace API.Helpers;

public class FileServices(IWebHostEnvironment webHostEnvironment, ILogger<FileServices> logger) : IFileServices
{
    private readonly string _filesPath = Path.Combine(webHostEnvironment.WebRootPath + "/images/products");
    private readonly ILogger<FileServices> _logger = logger;

    public async Task<(bool, string)> SaveFileAsync(IFormFile file, CancellationToken cancellationToken)
    {
        try
        {
            string[] imagesExtentions = [".jpg", ".png", ".jpeg", ".pmp"];

            if (!imagesExtentions.Contains(Path.GetExtension(file.FileName)))
                return (false, "");

            var filePath = _filesPath + $"/{file.FileName}";

            using var stream = File.Create(filePath);
            await file.CopyToAsync(stream, cancellationToken);

            var commonFilesPath = "/images/products";

            return (true, $"{commonFilesPath}/{file.FileName}");
        }
        catch (Exception ex)
        {
            _logger.LogError("error happen in file {message} ", ex.Message);
            return (false, "");
        }

    }
}
