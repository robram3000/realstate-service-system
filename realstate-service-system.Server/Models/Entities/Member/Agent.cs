using realstate_service_system.Server.Models.Entities.RealstateProperties;

namespace realstate_service_system.Server.Models.Entities.Member
{
    public class Agent : User
    {
        public string LicenseNumber { get; set; } = string.Empty;
        public string Specialization { get; set; } = string.Empty;
        public int YearsOfExperience { get; set; }
        public decimal CommissionRate { get; set; }
        public bool IsAvailable { get; set; } = true;
        public string Bio { get; set; } = string.Empty;
        public string Languages { get; set; } = string.Empty;

        // Navigation properties
        public virtual ICollection<Property> ManagedProperties { get; set; } = new List<Property>();
        public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}