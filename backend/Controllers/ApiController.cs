using FashionWebsite.Api.Data;
using FashionWebsite.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FashionWebsite.Api.Controllers;

[ApiController]
[Route("api")]
public class FashionApiController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public FashionApiController(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    // ── Users / Auth ──────────────────────────────────────────

    [HttpGet("getRegisters")]
    public async Task<IActionResult> GetRegisters()
    {
        var users = await _db.Users.OrderByDescending(u => u.CreatedAt).ToListAsync();
        return Ok(users);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest dto)
    {
        var user = new UserAccount
        {
            Username = dto.Username,
            Email = dto.Email,
            Password = dto.Password
        };
        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Registered", id = user.Id });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var adminUser = _config["AdminCredentials:Username"] ?? Environment.GetEnvironmentVariable("ADMIN_USERNAME") ?? "admin";
        var adminPass = _config["AdminCredentials:Password"] ?? Environment.GetEnvironmentVariable("ADMIN_PASSWORD") ?? "admin123";

        if (request.Username == adminUser && request.Password == adminPass)
            return Ok(new { status = "ok", role = "admin", data = Guid.NewGuid().ToString("N") });

        var user = await _db.Users.FirstOrDefaultAsync(u =>
            u.Username == request.Username && u.Password == request.Password);

        if (user == null)
            return Ok(new { status = "error", error = "Invalid credentials" });

        return Ok(new { status = "ok", role = "user", data = Guid.NewGuid().ToString("N") });
    }

    // ── Products (Quick Clothing) ─────────────────────────────

    [HttpGet("getData")]
    public async Task<IActionResult> GetData()
    {
        var products = await _db.Products.OrderByDescending(p => p.CreatedAt).ToListAsync();
        return Ok(products);
    }

    [HttpPost("new")]
    public async Task<IActionResult> NewProduct([FromBody] ProductRequest dto)
    {
        var product = new Product
        {
            Name = dto.Name ?? dto.Items ?? "",
            Items = dto.Items ?? dto.Name ?? "",
            Price = dto.Price,
            Image = dto.Image ?? dto.Img ?? "",
            Img = dto.Img ?? dto.Image ?? "",
            Category = dto.Category ?? "",
            Description = dto.Description ?? ""
        };
        _db.Products.Add(product);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Added", id = product.Id });
    }

    // ── Clothes (Custom Tailoring) ────────────────────────────

    [HttpGet("getClothes")]
    public async Task<IActionResult> GetClothes()
    {
        var clothes = await _db.Clothes.OrderByDescending(c => c.CreatedAt).ToListAsync();
        return Ok(clothes);
    }

    [HttpPost("newClothes")]
    public async Task<IActionResult> NewClothes([FromBody] ProductRequest dto)
    {
        var item = new Clothes
        {
            Name = dto.Name ?? dto.Items ?? "",
            Items = dto.Items ?? dto.Name ?? "",
            Price = dto.Price,
            Image = dto.Image ?? dto.Img ?? "",
            Img = dto.Img ?? dto.Image ?? "",
            Category = dto.Category ?? "",
            Description = dto.Description ?? ""
        };
        _db.Clothes.Add(item);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Added", id = item.Id });
    }

    // ── Orders ────────────────────────────────────────────────

    [HttpGet("ordergetdata")]
    public async Task<IActionResult> OrderGetData()
    {
        var orders = await _db.Orders.OrderByDescending(o => o.CreatedAt).ToListAsync();
        return Ok(orders);
    }

    [HttpGet("getOrders")]
    public async Task<IActionResult> GetOrders()
    {
        var orders = await _db.CustomOrders.OrderByDescending(o => o.CreatedAt).ToListAsync();
        return Ok(orders);
    }

    [HttpPost("orders")]
    public async Task<IActionResult> PostOrder([FromBody] CustomOrderRequest dto)
    {
        var order = new CustomOrder
        {
            Frock = dto.Frock ?? "",
            Shirt = dto.Shirt ?? "",
            Saree = dto.Saree ?? "",
            Jeans = dto.Jeans ?? "",
            Size = dto.Size ?? "",
            Pattern = dto.Pattern ?? "",
            Details = dto.Details ?? "",
            FullName = dto.FullName ?? "",
            Address = dto.Address ?? "",
            City = dto.City ?? "",
            Phone = dto.Phone ?? "",
            Email = dto.Email ?? ""
        };
        _db.CustomOrders.Add(order);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Order saved", id = order.Id });
    }

    [HttpPost("orderdata")]
    public async Task<IActionResult> PostOrderData([FromBody] OrderDataRequest dto)
    {
        var order = new Order
        {
            Email = dto.Email_1 ?? "",
            Phone = dto.Phone_1 ?? "",
            City = dto.City_1 ?? "",
            Address = dto.Address_1 ?? ""
        };
        _db.Orders.Add(order);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Order data saved", id = order.Id });
    }
}

// ── Request DTOs ──────────────────────────────────────────────

public class LoginRequest
{
    public string Username { get; set; } = "";
    public string Password { get; set; } = "";
}

public class RegisterRequest
{
    public string Username { get; set; } = "";
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}

public class ProductRequest
{
    public string? Name { get; set; }
    public string? Items { get; set; }
    public decimal Price { get; set; }
    public string? Image { get; set; }
    public string? Img { get; set; }
    public string? Category { get; set; }
    public string? Description { get; set; }
}

public class OrderDataRequest
{
    public string? Email_1 { get; set; }
    public string? Phone_1 { get; set; }
    public string? City_1 { get; set; }
    public string? Address_1 { get; set; }
}

public class CustomOrderRequest
{
    public string? Frock { get; set; }
    public string? Shirt { get; set; }
    public string? Saree { get; set; }
    public string? Jeans { get; set; }
    public string? Size { get; set; }
    public string? Pattern { get; set; }
    public string? Details { get; set; }
    public string? FullName { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
}
