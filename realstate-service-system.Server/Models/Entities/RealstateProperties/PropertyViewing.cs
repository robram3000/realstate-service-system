using realstate_service_system.Server.Models.Entities.Member;
using realstate_service_system.Server.Models.Entities.RealstateProperties;

namespace realstate_service_system.Server.Models.Entities
{
    public class PropertyViewing : BaseEntity
    {
        public DateTime ViewingDate { get; set; }
        public TimeSpan ViewingTime { get; set; }
        public string Status { get; set; } = "Scheduled"; 
        public string? ClientFeedback { get; set; }
        public int? ClientRating { get; set; } 

       
        public Guid ClientId { get; set; }
        public Guid PropertyId { get; set; }

      
        public virtual Client Client { get; set; } = null!;
        public virtual Property Property { get; set; } = null!;
    }
}