using realstate_service_system.Server.Models.Entities.RealstateProperties;

namespace realstate_service_system.Server.Data.Repository.Interface.Properties
{
    public interface IPropertyRepository : IRepositoryBase<Property>
    {
        Task<IEnumerable<Property>> GetPropertiesWithDetailsAsync();
        Task<Property?> GetPropertyWithDetailsAsync(Guid id);
        Task<IEnumerable<Property>> GetPropertiesByAgentAsync(Guid agentId);
        Task<IEnumerable<Property>> GetPropertiesByOwnerAsync(Guid ownerId);
        Task<IEnumerable<Property>> SearchPropertiesAsync(string city, decimal? minPrice, decimal? maxPrice,
            int? bedrooms, string propertyType);
        Task<IEnumerable<Property>> GetAvailablePropertiesAsync();
        Task<bool> PropertyExistsAsync(string address, string city);
    }
}
