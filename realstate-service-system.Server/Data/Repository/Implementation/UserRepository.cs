using Microsoft.EntityFrameworkCore;
using realstate_service_system.Server.Data.DbContext;
using realstate_service_system.Server.Data.Repository.Interface.User;
using realstate_service_system.Server.Models.Entities.Member;

namespace realstate_service_system.Server.Data.Repository.Implementation
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _dbSet
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetByEmailWithRoleAsync(string email)
        {
            return await _dbSet
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<IEnumerable<User>> GetUsersByRoleAsync(string role)
        {
            return await _dbSet
                .AsNoTracking()
                .Where(u => u.Role.ToString() == role)
                .ToListAsync();
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _dbSet.AnyAsync(u => u.Email == email);
        }

        public async Task<bool> PhoneNumberExistsAsync(string phoneNumber)
        {
            return await _dbSet.AnyAsync(u => u.PhoneNumber == phoneNumber);
        }
    }
}
