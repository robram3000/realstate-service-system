using realstate_service_system.Server.Models.Entities.Member;
using realstate_service_system.Server.Models.Entities.RealstateProperties;

namespace realstate_service_system.Server.Models.Entities
{
    public class Appointment : BaseEntity
    {
        public DateTime AppointmentDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string Purpose { get; set; } = string.Empty; 
        public string Status { get; set; } = "Scheduled"; 
        public string? Notes { get; set; }

        // Foreign keys
        public Guid ClientId { get; set; }
        public Guid AgentId { get; set; }
        public Guid PropertyId { get; set; }

        // Navigation properties
        public virtual Client Client { get; set; } = null!;
        public virtual Agent Agent { get; set; } = null!;
        public virtual Property Property { get; set; } = null!;
    }
}