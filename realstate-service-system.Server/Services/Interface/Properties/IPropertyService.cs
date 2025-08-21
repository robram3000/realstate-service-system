using realstate_service_system.Server.Models.Entities.RealstateProperties;

namespace realstate_service_system.Server.Services.Interface.Properties
{
    public interface IPropertyService
    {
        Task<IEnumerable<Property>> GetAllPropertiesAsync();
        Task<Property?> GetPropertyByIdAsync(Guid id);
        Task<Property> CreatePropertyAsync(Property property);
        Task UpdatePropertyAsync(Property property);
        Task DeletePropertyAsync(Guid id);
        Task<IEnumerable<Property>> SearchPropertiesAsync(string city, decimal? minPrice, decimal? maxPrice, int? bedrooms, string propertyType);
        Task<IEnumerable<Property>> GetPropertiesByAgentAsync(Guid agentId);
        Task<IEnumerable<Property>> GetPropertiesByOwnerAsync(Guid ownerId);
        Task AddPropertyImageAsync(Guid propertyId, PropertyImage image);
    }
}
