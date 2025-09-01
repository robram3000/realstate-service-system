namespace realstate_service_system.Server.Models.Entities.Members
{
    public class Agent : Member
    {
        public string LicenseNumber { get; set; } = string.Empty;
        public string Specialization { get; set; } = string.Empty;
        public int YearsOfExperience { get; set; }
        public decimal CommissionRate { get; set; }
        public bool IsAvailable { get; set; } = true;
        public string Bio { get; set; } = string.Empty;
        public string Languages { get; set; } = string.Empty;
    }
}