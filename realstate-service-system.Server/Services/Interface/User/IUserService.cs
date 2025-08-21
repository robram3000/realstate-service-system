using realstate_service_system.Server.Models.Enums;
using realstate_ser
namespace realstate_service_system.Server.Services.Interface.User
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(Guid id);
        Task<User?> GetUserByEmailAsync(string email);
        Task<User> CreateUserAsync(User user, string password);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(Guid id);
        Task<bool> VerifyPasswordAsync(string email, string password);
        Task<IEnumerable<User>> GetUsersByRoleAsync(RoleType role);
    }
}
