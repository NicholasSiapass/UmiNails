using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api/services", () => new[]
{
    new { Name = "Manicure", Price = 25 },
    new { Name = "Pedicure", Price = 35 },
    new { Name = "Gel Nails", Price = 45 }
});

app.Run("http://localhost:5000");
