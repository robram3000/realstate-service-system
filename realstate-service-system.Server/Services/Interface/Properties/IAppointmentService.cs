using realstate_service_system.Server.Models.Entities;

namespace realstate_service_system.Server.Services.Interface.Properties
{
    public interface IAppointmentService
    {
        Task<IEnumerable<Appointment>> GetAllAppointmentsAsync();
        Task<Appointment?> GetAppointmentByIdAsync(Guid id);
        Task<Appointment> CreateAppointmentAsync(Appointment appointment);
        Task UpdateAppointmentAsync(Appointment appointment);
        Task DeleteAppointmentAsync(Guid id);
        Task<IEnumerable<Appointment>> GetAppointmentsByClientAsync(Guid clientId);
        Task<IEnumerable<Appointment>> GetAppointmentsByAgentAsync(Guid agentId);
        Task<bool> CheckAppointmentConflictAsync(Guid agentId, DateTime date, TimeSpan startTime, TimeSpan endTime);
    }
}
