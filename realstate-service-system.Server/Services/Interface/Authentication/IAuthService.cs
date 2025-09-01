using realstate_service_system.Server.Models.Entities.Members;

namespace realstate_service_system.Server.Services.Interface.Authentication
{
    public interface IAuthService
    {
        Task<string> LoginAsync(string email, string password);
        Task<bool> RegisterAsync(Member user, string password);
        Task<bool> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword);
        Task<bool> VerifyEmailAsync(string token);
    }

}
