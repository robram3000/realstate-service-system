using Microsoft.EntityFrameworkCore;

using realstate_service_system.Server.Data.Repository.Interface.Properties;
using realstate_service_system.Server.Models.Entities;

namespace realstate_service_system.Server.Data.Repository.Implementation
{
    public class AppointmentRepository : RepositoryBase<Appointment>, IAppointmentRepository
    {
        public AppointmentRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsWithDetailsAsync()
        {
            return await _dbSet
                .AsNoTracking()
                .Include(a => a.Client)
                .Include(a => a.Agent)
                .Include(a => a.Property)
                .ThenInclude(p => p.Images)
                .ToListAsync();
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByClientAsync(Guid clientId)
        {
            return await _dbSet
                .AsNoTracking()
                .Include(a => a.Agent)
                .Include(a => a.Property)
                .ThenInclude(p => p.Images)
                .Where(a => a.ClientId == clientId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByAgentAsync(Guid agentId)
        {
            return await _dbSet
                .AsNoTracking()
                .Include(a => a.Client)
                .Include(a => a.Property)
                .ThenInclude(p => p.Images)
                .Where(a => a.AgentId == agentId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByPropertyAsync(Guid propertyId)
        {
            return await _dbSet
                .AsNoTracking()
                .Include(a => a.Client)
                .Include(a => a.Agent)
                .Where(a => a.PropertyId == propertyId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Appointment>> GetUpcomingAppointmentsAsync(DateTime date)
        {
            return await _dbSet
                .AsNoTracking()
                .Include(a => a.Client)
                .Include(a => a.Agent)
                .Include(a => a.Property)
                .Where(a => a.AppointmentDate >= date && a.Status == "Scheduled")
                .OrderBy(a => a.AppointmentDate)
                .ThenBy(a => a.StartTime)
                .ToListAsync();
        }

        public async Task<bool> HasConflictingAppointmentAsync(Guid agentId, DateTime date, TimeSpan startTime, TimeSpan endTime)
        {
            return await _dbSet.AnyAsync(a =>
                a.AgentId == agentId &&
                a.AppointmentDate == date &&
                a.Status == "Scheduled" &&
                ((a.StartTime <= startTime && a.EndTime > startTime) ||
                 (a.StartTime < endTime && a.EndTime >= endTime) ||
                 (a.StartTime >= startTime && a.EndTime <= endTime)));
        }
    }
}