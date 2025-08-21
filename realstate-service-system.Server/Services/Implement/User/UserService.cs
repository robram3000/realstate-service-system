using realstate_service_system.Server.Data.Repository.Interface.Properties;
using realstate_service_system.Server.Models.Enums;
using realstate_service_system.Server.Services.Interface.User;

namespace realstate_service_system.Server.Services.Implement.User
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _unitOfWork.Users.GetAllAsync();
        }

        public async Task<User?> GetUserByIdAsync(Guid id)
        {
            return await _unitOfWork.Users.GetByIdAsync(id);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _unitOfWork.Users.GetByEmailAsync(email);
        }

        public async Task<User> CreateUserAsync(User user, string password)
        {
            if (await _unitOfWork.Users.EmailExistsAsync(user.Email))
                throw new ArgumentException("Email already exists");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
            user.CreatedAt = DateTime.UtcNow;
            user.IsActive = true;

            var createdUser = await _unitOfWork.Users.CreateAsync(user);
            await _unitOfWork.CompleteAsync();
            return createdUser;
        }

        public async Task UpdateUserAsync(User user)
        {
            var existingUser = await _unitOfWork.Users.GetByIdAsync(user.Id);
            if (existingUser == null)
                throw new KeyNotFoundException("User not found");

            _unitOfWork.Users.UpdateAsync(user);
            await _unitOfWork.CompleteAsync();
        }

        public async Task DeleteUserAsync(Guid id)
        {
            var user = await _unitOfWork.Users.GetByIdAsync(id);
            if (user == null)
                throw new KeyNotFoundException("User not found");

            await _unitOfWork.Users.DeleteAsync(user);
            await _unitOfWork.CompleteAsync();
        }

        public async Task<bool> VerifyPasswordAsync(string email, string password)
        {
            var user = await _unitOfWork.Users.GetByEmailAsync(email);
            if (user == null) return false;

            return BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
        }

        public async Task<IEnumerable<User>> GetUsersByRoleAsync(RoleType role)
        {
            return await _unitOfWork.Users.GetUsersByRoleAsync(role.ToString());
        }
    }
}
