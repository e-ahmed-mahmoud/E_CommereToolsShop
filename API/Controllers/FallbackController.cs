using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers;

[Route("[controller]")]
public class FallbackController : Controller
{
    private readonly ILogger<FallbackController> _logger;

    public FallbackController(ILogger<FallbackController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
    }

}
