using FashionWebsite.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FashionWebsite.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Clothes> Clothes => Set<Clothes>();
    public DbSet<UserAccount> Users => Set<UserAccount>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<CustomOrder> CustomOrders => Set<CustomOrder>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(e =>
        {
            e.ToTable("products");
            e.HasKey(p => p.Id);
            e.Property(p => p.Id).UseIdentityAlwaysColumn();
        });

        modelBuilder.Entity<Clothes>(e =>
        {
            e.ToTable("clothes");
            e.HasKey(c => c.Id);
            e.Property(c => c.Id).UseIdentityAlwaysColumn();
        });

        modelBuilder.Entity<UserAccount>(e =>
        {
            e.ToTable("users");
            e.HasKey(u => u.Id);
            e.Property(u => u.Id).UseIdentityAlwaysColumn();
        });

        modelBuilder.Entity<Order>(e =>
        {
            e.ToTable("orders");
            e.HasKey(o => o.Id);
            e.Property(o => o.Id).UseIdentityAlwaysColumn();
        });

        modelBuilder.Entity<CustomOrder>(e =>
        {
            e.ToTable("custom_orders");
            e.HasKey(o => o.Id);
            e.Property(o => o.Id).UseIdentityAlwaysColumn();
        });
    }
}
