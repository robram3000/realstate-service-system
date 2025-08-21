namespace realstate_service_system.Server.Models.Entities.RealstateProperties
{
    public class PropertyImage : BaseEntity
    {
        public string ImageUrl { get; set; } = string.Empty;
        public string? AltText { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsPrimary { get; set; }

        // Foreign key
        public Guid PropertyId { get; set; }

        // Navigation property
        public virtual Property Property { get; set; } = null!;
    }
}