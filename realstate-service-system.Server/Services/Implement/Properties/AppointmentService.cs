using realstate_service_system.Server.Data.Repository.Interface.Properties;
using realstate_service_system.Server.Models.Entities;

namespace realstate_service_system.Server.Services.Implement.Properties
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IUnitOfWork _unitOfWork;

        public AppointmentService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Appointment>> GetAllAppointmentsAsync()
        {
            return await _unitOfWork.Appointments.GetAppointmentsWithDetailsAsync();
        }

        public async Task<Appointment?> GetAppointmentByIdAsync(Guid id)
        {
            return await _unitOfWork.Appointments.GetByIdAsync(id);
        }

        public async Task<Appointment> CreateAppointmentAsync(Appointment appointment)
        {
            if (await CheckAppointmentConflictAsync(appointment.AgentId, appointment.AppointmentDate, appointment.StartTime, appointment.EndTime))
                throw new ArgumentException("Appointment time conflict");

            appointment.CreatedAt = DateTime.UtcNow;
            appointment.Status = "Scheduled";

            var createdAppointment = await _unitOfWork.Appointments.CreateAsync(appointment);
            await _unitOfWork.CompleteAsync();
            return createdAppointment;
        }

        public async Task UpdateAppointmentAsync(Appointment appointment)
        {
            var existingAppointment = await _unitOfWork.Appointments.GetByIdAsync(appointment.Id);
            if (existingAppointment == null)
                throw new KeyNotFoundException("Appointment not found");

            _unitOfWork.Appointments.UpdateAsync(appointment);
            await _unitOfWork.CompleteAsync();
        }

        public async Task DeleteAppointmentAsync(Guid id)
        {
            var appointment = await _unitOfWork.Appointments.GetByIdAsync(id);
            if (appointment == null)
                throw new KeyNotFoundException("Appointment not found");

            await _unitOfWork.Appointments.DeleteAsync(appointment);
            await _unitOfWork.CompleteAsync();
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByClientAsync(Guid clientId)
        {
            return await _unitOfWork.Appointments.GetAppointmentsByClientAsync(clientId);
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByAgentAsync(Guid agentId)
        {
            return await _unitOfWork.Appointments.GetAppointmentsByAgentAsync(agentId);
        }

        public async Task<bool> CheckAppointmentConflictAsync(Guid agentId, DateTime date, TimeSpan startTime, TimeSpan endTime)
        {
            return await _unitOfWork.Appointments.HasConflictingAppointmentAsync(agentId, date, startTime, endTime);
        }
    }

}
