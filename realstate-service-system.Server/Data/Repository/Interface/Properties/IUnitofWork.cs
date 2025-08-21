using realstate_service_system.Server.Data.Repository.Interface.User;

namespace realstate_service_system.Server.Data.Repository.Interface.Properties
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        IPropertyRepository Properties { get; }
        IAppointmentRepository Appointments { get; }
        Task<int> CompleteAsync();
    }
}
