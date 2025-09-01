
using realstate_service_system.Server.Models.Entities.Members;
using realstate_service_system.Server.Models.Enums;

namespace realstate_service_system.Server.Services.Interface.User
{
    public interface IUserService
    {
        Task<IEnumerable<Member>> GetAllUsersAsync();
        Task<Member?> GetUserByIdAsync(Guid id);
        Task<Member?> GetUserByEmailAsync(string email);
        Task<Member> CreateUserAsync(Member user, string password);
        Task UpdateUserAsync(Member user);
        Task DeleteUserAsync(Guid id);
        Task<bool> VerifyPasswordAsync(string email, string password);
        Task<IEnumerable<Member>> GetUsersByRoleAsync(RoleType role);
    }
}
