namespace FashionWebsite.Api.Models;

public class CustomOrder
{
    public int Id { get; set; }
    public string Frock { get; set; } = "";
    public string Shirt { get; set; } = "";
    public string Saree { get; set; } = "";
    public string Jeans { get; set; } = "";
    public string Size { get; set; } = "";
    public string Pattern { get; set; } = "";
    public string Details { get; set; } = "";
    public string FullName { get; set; } = "";
    public string Address { get; set; } = "";
    public string City { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Email { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
