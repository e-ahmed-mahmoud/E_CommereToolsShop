using API.Helpers;
using API.Middleware;
using API.SignalR;
using Core.Entities;
using Infrastructure.Data;
using Infrastructure.Data.DataSeed;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddDependencies(builder.Configuration);

var app = builder.Build();

app.UseExceptionHandler();

app.UseCors("DefaultPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection();
app.UseHttpInfoLog();

app.UseAuthorization();

app.MapControllers();
app.MapGroup("api").MapIdentityApi<ApplicationUser>();

app.MapHub<NotificationHub>("/hub/notifications");

app.MapFallbackToController("Index", "Fallback");

try
{
    using var serviceScope = app.Services.CreateScope();
    var storeDbContext = serviceScope.ServiceProvider.GetRequiredService<StoreDbContext>();
    var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    await storeDbContext.Database.MigrateAsync();
    await DataSeed.SeedingData(storeDbContext, userManager);
}
catch (Exception ex)
{
    System.Console.WriteLine(ex);
}

app.Run();
