<<<<<<< HEAD
﻿using Microsoft.EntityFrameworkCore;
using realstate_service_system.Server.Data.DbContext;
=======
﻿using realstate_service_system.Server.Data.DbContext;
>>>>>>> 4b1863d7bdf8454c8a355b631696f7daad95c7bf
using realstate_service_system.Server.Data.Repository.Interface.Properties;
using realstate_service_system.Server.Models.Entities.RealstateProperties;

namespace realstate_service_system.Server.Data.Repository.Implementation
{
    public class PropertyRepository : RepositoryBase<Property>, IPropertyRepository
    {
        public PropertyRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Property>> GetPropertiesWithDetailsAsync()
        {
            return await _dbSet
                .AsNoTracking()
                .Include(p => p.Owner)
                .Include(p => p.Agent)
                .Include(p => p.Images)
                .ToListAsync();
        }

        public async Task<Property?> GetPropertyWithDetailsAsync(Guid id)
        {
            return await _dbSet
                .Include(p => p.Owner)
                .Include(p => p.Agent)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Property>> GetPropertiesByAgentAsync(Guid agentId)
        {
            return await _dbSet
                .AsNoTracking()
                .Include(p => p.Owner)
                .Include(p => p.Images)
                .Where(p => p.AgentId == agentId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Property>> GetPropertiesByOwnerAsync(Guid ownerId)
        {
            return await _dbSet
                .AsNoTracking()
                .Include(p => p.Agent)
                .Include(p => p.Images)
                .Where(p => p.OwnerId == ownerId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Property>> SearchPropertiesAsync(string city, decimal? minPrice, decimal? maxPrice,
            int? bedrooms, string propertyType)
        {
            var query = _dbSet
                .AsNoTracking()
                .Include(p => p.Images)
                .AsQueryable();

            if (!string.IsNullOrEmpty(city))
                query = query.Where(p => p.City.Contains(city));

            if (minPrice.HasValue)
                query = query.Where(p => p.Price >= minPrice.Value);

            if (maxPrice.HasValue)
                query = query.Where(p => p.Price <= maxPrice.Value);

            if (bedrooms.HasValue)
                query = query.Where(p => p.Bedrooms >= bedrooms.Value);

            if (!string.IsNullOrEmpty(propertyType))
                query = query.Where(p => p.PropertyType == propertyType);

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<Property>> GetAvailablePropertiesAsync()
        {
            return await _dbSet
                .AsNoTracking()
                .Include(p => p.Images)
                .Where(p => p.Status == "Available")
                .ToListAsync();
        }

        public async Task<bool> PropertyExistsAsync(string address, string city)
        {
            return await _dbSet.AnyAsync(p => p.Address == address && p.City == city);
        }
    }
}
