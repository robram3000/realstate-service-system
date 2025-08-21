namespace realstate_service_system.Server.Services.Interface.Authentication
{
    public interface IAuthService
    {
        Task<string> LoginAsync(string email, string password);
        Task<bool> RegisterAsync(User user, string password);
        Task<bool> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword);
        Task<bool> VerifyEmailAsync(string token);
    }

}
