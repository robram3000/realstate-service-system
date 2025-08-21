using Microsoft.EntityFrameworkCore;
using realstate_service_system.Server.Data;
using realstate_service_system.Server.Data.Repository.Implementation;
using realstate_service_system.Server.Data.Repository.Interface.Properties;
using realstate_service_system.Server.Data.Repository.Interface.User;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

/// <summary>
///  
///  Repository configuration for entities 
///  
/// </summary>

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();
builder.Services.AddScoped<IAppointmentRepository, AppointmentRepository>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
