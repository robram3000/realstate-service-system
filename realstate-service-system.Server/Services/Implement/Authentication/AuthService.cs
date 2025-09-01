using realstate_service_system.Server.Data.Repository.Interface.Properties;
using realstate_service_system.Server.Models.Entities.Members;
using realstate_service_system.Server.Services.Interface.Authentication;

namespace realstate_service_system.Server.Services.Implement.Authentication
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJwtService _jwtService;

        public AuthService(IUnitOfWork unitOfWork, IJwtService jwtService)
        {
            _unitOfWork = unitOfWork;
            _jwtService = jwtService;
        }

        public async Task<string> LoginAsync(string email, string password)
        {
            var user = await _unitOfWork.Users.GetByEmailAsync(email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                throw new UnauthorizedAccessException("Invalid credentials");

            if (!user.IsActive)
                throw new UnauthorizedAccessException("Account is deactivated");

            return _jwtService.GenerateToken(user);
        }

        public async Task<bool> RegisterAsync(Member user, string password)
        {
            if (await _unitOfWork.Users.EmailExistsAsync(user.Email))
                return false;

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
            user.CreatedAt = DateTime.UtcNow;
            user.IsActive = true;
            user.VerificationToken = Guid.NewGuid().ToString();

            await _unitOfWork.Users.CreateAsync(user);
            await _unitOfWork.CompleteAsync();
            return true;
        }

        public async Task<bool> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword)
        {
            var user = await _unitOfWork.Users.GetByIdAsync(userId);
            if (user == null || !BCrypt.Net.BCrypt.Verify(currentPassword, user.PasswordHash))
                return false;

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
            await _unitOfWork.CompleteAsync();
            return true;
        }

        public async Task<bool> VerifyEmailAsync(string token)
        {
            var user = (await _unitOfWork.Users.GetByConditionAsync(u => u.VerificationToken == token)).FirstOrDefault();
            if (user == null) return false;

            user.EmailVerified = true;
            user.VerificationToken = null;
            await _unitOfWork.CompleteAsync();
            return true;
        }
    }
}
