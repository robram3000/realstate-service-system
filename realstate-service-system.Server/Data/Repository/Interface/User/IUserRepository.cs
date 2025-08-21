using realstate_service_system.Server.Models.Entities.Member;

namespace realstate_service_system.Server.Data.Repository.Interface.User
{
    public interface IUserRepository : IRepositoryBase<realstate_service_system.Server.Models.Entities.Member.User>
    {
        Task<realstate_service_system.Server.Models.Entities.Member.User?> GetByEmailAsync(string email);
        Task<realstate_service_system.Server.Models.Entities.Member.User?> GetByEmailWithRoleAsync(string email);
        Task<IEnumerable<realstate_service_system.Server.Models.Entities.Member.User>> GetUsersByRoleAsync(string role);
        Task<bool> EmailExistsAsync(string email);
        Task<bool> PhoneNumberExistsAsync(string phoneNumber);
    }
}
