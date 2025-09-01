
using realstate_service_system.Server.Models.Entities.Members;

namespace realstate_service_system.Server.Data.Repository.Interface.User
{
    public interface IUserRepository : IRepositoryBase<Member>
    {
        Task<Member?> GetByEmailAsync(string email);
        Task<Member?> GetByEmailWithRoleAsync(string email);
        Task<IEnumerable<Member>> GetUsersByRoleAsync(string role);
        Task<bool> EmailExistsAsync(string email);
        Task<bool> PhoneNumberExistsAsync(string phoneNumber);
    }
}
