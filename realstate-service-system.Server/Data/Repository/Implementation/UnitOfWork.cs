
using realstate_service_system.Server.Data.Repository.Interface.Properties;
using realstate_service_system.Server.Data.Repository.Interface.User;

namespace realstate_service_system.Server.Data.Repository.Implementation
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            Users = new UserRepository(_context);
            Properties = new PropertyRepository(_context);
            Appointments = new AppointmentRepository(_context);
        }

        public IUserRepository Users { get; private set; }
        public IPropertyRepository Properties { get; private set; }
        public IAppointmentRepository Appointments { get; private set; }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
