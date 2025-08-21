using Microsoft.EntityFrameworkCore;
using realstate_service_system.Server.Models.Entities;
using realstate_service_system.Server.Models.Entities.Member;
using realstate_service_system.Server.Models.Entities.RealstateProperties;
using realstate_service_system.Server.Models.Enums;
// Remove the BCrypt using directive and use fully qualified name instead

namespace realstate_service_system.Server.Data.DbContext
{
    public class ApplicationDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // DbSets for all entities
        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Agent> Agents { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<PropertyImage> PropertyImages { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<PropertyViewing> PropertyViewings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure entity relationships and constraints
            ConfigureUserEntities(modelBuilder);
            ConfigurePropertyEntities(modelBuilder);
            ConfigureAppointmentEntities(modelBuilder);
            ConfigureViewingEntities(modelBuilder);
            SeedInitialData(modelBuilder);
        }

        private void ConfigureUserEntities(ModelBuilder modelBuilder)
        {
            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.FirstName).IsRequired().HasMaxLength(100);
                entity.Property(u => u.LastName).IsRequired().HasMaxLength(100);
                entity.Property(u => u.Email).IsRequired().HasMaxLength(256);
                entity.Property(u => u.PhoneNumber).HasMaxLength(20);
                entity.Property(u => u.PasswordHash).IsRequired();
                entity.Property(u => u.ProfilePictureUrl).HasMaxLength(500);
                entity.Property(u => u.VerificationToken).HasMaxLength(100);

                // Indexes
                entity.HasIndex(u => u.Email).IsUnique();
                entity.HasIndex(u => u.PhoneNumber).IsUnique();
                entity.HasIndex(u => u.Role);
            });

            // Configure TPH (Table Per Hierarchy) for User inheritance
            modelBuilder.Entity<User>()
                .HasDiscriminator(u => u.Role)
                .HasValue<User>(RoleType.SuperAdmin)
                .HasValue<User>(RoleType.Admin)
                .HasValue<Client>(RoleType.Client)
                .HasValue<Agent>(RoleType.Agent);

            // Client specific configuration
            modelBuilder.Entity<Client>(entity =>
            {
                entity.Property(c => c.PreferredLocation).HasMaxLength(200);
                entity.Property(c => c.PropertyTypePreference).HasMaxLength(100);
            });

            // Agent specific configuration
            modelBuilder.Entity<Agent>(entity =>
            {
                entity.Property(a => a.LicenseNumber).IsRequired().HasMaxLength(50);
                entity.Property(a => a.Specialization).HasMaxLength(100);
                entity.Property(a => a.Bio).HasMaxLength(1000);
                entity.Property(a => a.Languages).HasMaxLength(200);

                entity.HasIndex(a => a.LicenseNumber).IsUnique();
            });
        }

        private void ConfigurePropertyEntities(ModelBuilder modelBuilder)
        {
            // Property configuration
            modelBuilder.Entity<Property>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Title).IsRequired().HasMaxLength(200);
                entity.Property(p => p.Description).HasColumnType("nvarchar(MAX)");
                entity.Property(p => p.Address).IsRequired().HasMaxLength(300);
                entity.Property(p => p.City).IsRequired().HasMaxLength(100);
                entity.Property(p => p.State).IsRequired().HasMaxLength(50);
                entity.Property(p => p.ZipCode).IsRequired().HasMaxLength(20);
                entity.Property(p => p.Country).IsRequired().HasMaxLength(50);
                entity.Property(p => p.PropertyType).IsRequired().HasMaxLength(50);
                entity.Property(p => p.Status).IsRequired().HasMaxLength(20);

                // Decimal configurations
                entity.Property(p => p.Price).HasColumnType("decimal(18,2)");
                entity.Property(p => p.MonthlyRent).HasColumnType("decimal(18,2)");
                entity.Property(p => p.SquareFootage).HasColumnType("decimal(18,2)");
                entity.Property(p => p.LotSize).HasColumnType("decimal(18,2)");

                // Relationships
                entity.HasOne(p => p.Owner)
                    .WithMany(u => u.Properties)
                    .HasForeignKey(p => p.OwnerId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(p => p.Agent)
                    .WithMany(a => a.ManagedProperties)
                    .HasForeignKey(p => p.AgentId)
                    .OnDelete(DeleteBehavior.SetNull);

                // Indexes
                entity.HasIndex(p => new { p.City, p.Status });
                entity.HasIndex(p => p.Price);
                entity.HasIndex(p => p.PropertyType);
                entity.HasIndex(p => new { p.Address, p.City }).IsUnique();
            });

            // PropertyImage configuration
            modelBuilder.Entity<PropertyImage>(entity =>
            {
                entity.HasKey(pi => pi.Id);
                entity.Property(pi => pi.ImageUrl).IsRequired().HasMaxLength(500);
                entity.Property(pi => pi.AltText).HasMaxLength(200);

                // Relationships
                entity.HasOne(pi => pi.Property)
                    .WithMany(p => p.Images)
                    .HasForeignKey(pi => pi.PropertyId)
                    .OnDelete(DeleteBehavior.Cascade);

                // Indexes
                entity.HasIndex(pi => pi.PropertyId);
                entity.HasIndex(pi => new { pi.PropertyId, pi.IsPrimary });
            });
        }

        private void ConfigureAppointmentEntities(ModelBuilder modelBuilder)
        {
            // Appointment configuration
            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(a => a.Id);
                entity.Property(a => a.Purpose).IsRequired().HasMaxLength(100);
                entity.Property(a => a.Status).IsRequired().HasMaxLength(20);
                entity.Property(a => a.Notes).HasMaxLength(1000);

                // Relationships
                entity.HasOne(a => a.Client)
                    .WithMany(c => c.Appointments)
                    .HasForeignKey(a => a.ClientId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(a => a.Agent)
                    .WithMany(a => a.Appointments)
                    .HasForeignKey(a => a.AgentId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(a => a.Property)
                    .WithMany()
                    .HasForeignKey(a => a.PropertyId)
                    .OnDelete(DeleteBehavior.Restrict);

                // Indexes
                entity.HasIndex(a => a.AppointmentDate);
                entity.HasIndex(a => new { a.AgentId, a.AppointmentDate, a.StartTime });
                entity.HasIndex(a => new { a.ClientId, a.AppointmentDate });
            });
        }

        private void ConfigureViewingEntities(ModelBuilder modelBuilder)
        {
            // PropertyViewing configuration
            modelBuilder.Entity<PropertyViewing>(entity =>
            {
                entity.HasKey(pv => pv.Id);
                entity.Property(pv => pv.Status).IsRequired().HasMaxLength(20);
                entity.Property(pv => pv.ClientFeedback).HasMaxLength(1000);

                // Relationships
                entity.HasOne(pv => pv.Client)
                    .WithMany(c => c.PropertyViewings)
                    .HasForeignKey(pv => pv.ClientId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(pv => pv.Property)
                    .WithMany(p => p.Viewings)
                    .HasForeignKey(pv => pv.PropertyId)
                    .OnDelete(DeleteBehavior.Restrict);

                // Indexes
                entity.HasIndex(pv => pv.ViewingDate);
                entity.HasIndex(pv => new { pv.ClientId, pv.PropertyId });
            });
        }

        private void SeedInitialData(ModelBuilder modelBuilder)
        {
            // Seed initial admin user
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = "System",
                    LastName = "Administrator",
                    Email = "admin@realstate.com",
                    PhoneNumber = "+1234567890",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"), // Fixed BCrypt reference
                    Role = RoleType.SuperAdmin,
                    EmailVerified = true,
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true,
                    IsDeleted = false
                }
            );
        }
    }
}