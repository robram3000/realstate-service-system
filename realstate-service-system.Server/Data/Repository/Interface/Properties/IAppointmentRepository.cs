using realstate_service_system.Server.Models.Entities;

namespace realstate_service_system.Server.Data.Repository.Interface.Properties
{
    public interface IAppointmentRepository : IRepositoryBase<Appointment>
    {
        Task<IEnumerable<Appointment>> GetAppointmentsWithDetailsAsync();
        Task<IEnumerable<Appointment>> GetAppointmentsByClientAsync(Guid clientId);
        Task<IEnumerable<Appointment>> GetAppointmentsByAgentAsync(Guid agentId);
        Task<IEnumerable<Appointment>> GetAppointmentsByPropertyAsync(Guid propertyId);
        Task<IEnumerable<Appointment>> GetUpcomingAppointmentsAsync(DateTime date);
        Task<bool> HasConflictingAppointmentAsync(Guid agentId, DateTime date, TimeSpan startTime, TimeSpan endTime);
    }
}
