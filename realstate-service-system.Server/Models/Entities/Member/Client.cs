namespace realstate_service_system.Server.Models.Entities.Members
{
    public class Client : Member
    {
        public decimal Budget { get; set; }
        public string PreferredLocation { get; set; } = string.Empty;
        public int? MinimumBedrooms { get; set; }
        public int? MinimumBathrooms { get; set; }
        public string PropertyTypePreference { get; set; } = string.Empty;
        public bool? ParkingRequired { get; set; }
        public bool? GardenRequired { get; set; }
    }
}