using Microsoft.EntityFrameworkCore;
using realstate_service_system.Server.Data;
using realstate_service_system.Server.Data.Repository.Implementation;
using realstate_service_system.Server.Data.Repository.Interface.Properties;
using realstate_service_system.Server.Data.Repository.Interface.User;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();
builder.Services.AddScoped<IAppointmentRepository, AppointmentRepository>();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        context.Database.EnsureCreated();

  

        Console.WriteLine("Database initialized successfully.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"An error occurred while initializing the database: {ex.Message}");
    }
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();