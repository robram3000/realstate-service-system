using realstate_service_system.Server.Models.Entities.Member;

namespace realstate_service_system.Server.Models.Entities.RealstateProperties
{
    public class Property : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal? MonthlyRent { get; set; }
        public string PropertyType { get; set; } = string.Empty; 
        public string Status { get; set; } = "Available"; 


        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public decimal SquareFootage { get; set; }
        public decimal? LotSize { get; set; }
        public int YearBuilt { get; set; }
        public int? Floor { get; set; }
        public int? TotalFloors { get; set; }

     
        public bool HasParking { get; set; }
        public bool HasGarden { get; set; }
        public bool HasPool { get; set; }
        public bool HasBalcony { get; set; }
        public bool HasElevator { get; set; }
        public bool HasSecurity { get; set; }

   
        public Guid OwnerId { get; set; }
        public Guid? AgentId { get; set; }


        public virtual User Owner { get; set; } = null!;
        public virtual Agent? Agent { get; set; }
        public virtual ICollection<PropertyImage> Images { get; set; } = new List<PropertyImage>();
        public virtual ICollection<PropertyViewing> Viewings { get; set; } = new List<PropertyViewing>();
    }
}