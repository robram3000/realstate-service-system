using realstate_service_system.Server.Models.Entities.RealstateProperties;
using realstate_service_system.Server.Models.Enums;

namespace realstate_service_system.Server.Models.Entities.Member
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public RoleType Role { get; set; }
        public string ProfilePictureUrl { get; set; } = string.Empty;
        public DateTime? LastLogin { get; set; }
        public bool EmailVerified { get; set; } = false;
        public string VerificationToken { get; set; } = string.Empty;
        public virtual ICollection<Property> Properties { get; set; } = new List<Property>();
        public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}