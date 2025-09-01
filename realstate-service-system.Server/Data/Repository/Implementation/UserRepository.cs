using Microsoft.EntityFrameworkCore;

using realstate_service_system.Server.Data.Repository.Interface.User;
using realstate_service_system.Server.Models.Entities.Members;

namespace realstate_service_system.Server.Data.Repository.Implementation
{
    public class UserRepository : RepositoryBase<Member>, IUserRepository
    {
        public UserRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Member?> GetByEmailAsync(string email)
        {
            return await _dbSet
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<Member?> GetByEmailWithRoleAsync(string email)
        {
            return await _dbSet
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<IEnumerable<Member>> GetUsersByRoleAsync(string role)
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
