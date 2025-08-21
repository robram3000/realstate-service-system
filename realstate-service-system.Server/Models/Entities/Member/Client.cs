using realstate_service_system.Server.Models.Entities.RealstateProperties;

namespace realstate_service_system.Server.Models.Entities.Member
{
    public class Client : User
    {
        public decimal Budget { get; set; }
        public string PreferredLocation { get; set; } = string.Empty;
        public int? MinimumBedrooms { get; set; }
        public int? MinimumBathrooms { get; set; }
        public string PropertyTypePreference { get; set; } = string.Empty;
        public bool? ParkingRequired { get; set; }
        public bool? GardenRequired { get; set; }
        public virtual ICollection<Property> FavoriteProperties { get; set; } = new List<Property>();
        public virtual ICollection<PropertyViewing> PropertyViewings { get; set; } = new List<PropertyViewing>();
    }
}