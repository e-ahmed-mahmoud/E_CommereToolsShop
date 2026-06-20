using API.Middleware;
using Core.Entities;
using Core.Interfaces;
using Infrastructure;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using Infrastructure.Data.Services;
using Infrastructure.Identity;
using Infrastructure.Payment;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

namespace API.Helpers;

public static class DIConfigurations
{
    public static IServiceCollection AddDependencies(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddExceptionHandler<GlobalExceptionHandler>();
        services.AddProblemDetails();
        services.AddCors(options => options.AddPolicy("DefaultPolicy", p =>
             p.WithOrigins(["http://localhost:4200", "https://localhost:4200"]).AllowAnyMethod().AllowAnyHeader().AllowCredentials()));

        services.AddDbContext<StoreDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("Defualt"));
        });

        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddSingleton<IConnectionMultiplexer>(config =>
        {
            var connectinString = configuration.GetConnectionString("Redis")
                ?? throw new ArgumentException("connection string not defined");
            var configuraiton = ConfigurationOptions.Parse(connectinString, true);
            return ConnectionMultiplexer.Connect(configuraiton);

        });
        services.AddSingleton<ICartService, CartService>();

        services.AddScoped<IPaymentService, PaymentService>();

        services.Configure<StripPaymentOptions>(configuration.GetSection(StripPaymentOptions.SectionName));

        services.AddAuthorization();
        services.AddIdentityApiEndpoints<ApplicationUser>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<StoreDbContext>();

        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        services.AddOpenApi();
        services.AddScoped<IAccountService, AccountService>();
        services.AddScoped<IOrderService, OrderService>();

        services.AddSignalR();

        //mapster config
        var config = TypeAdapterConfig.GlobalSettings;
        config.Scan(typeof(IAssemblyMarker).Assembly);
        services.AddSingleton<IMapper>(new Mapper(config));

        services.AddScoped<IFileServices, FileServices>();


        return services;
    }

}
