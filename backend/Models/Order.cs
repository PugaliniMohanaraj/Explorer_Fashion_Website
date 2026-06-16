namespace FashionWebsite.Api.Models;

public class Order
{
    public int Id { get; set; }
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string City { get; set; } = "";
    public string Address { get; set; } = "";
    public string Status { get; set; } = "pending";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
