using realstate_service_system.Server.Data.Repository.Interface.Properties;
using realstate_service_system.Server.Models.Entities.RealstateProperties;
using realstate_service_system.Server.Services.Interface.Properties;

namespace realstate_service_system.Server.Services.Implement.Properties
{

    public class PropertyService : IPropertyService
    {
        private readonly IUnitOfWork _unitOfWork;

        public PropertyService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Property>> GetAllPropertiesAsync()
        {
            return await _unitOfWork.Properties.GetPropertiesWithDetailsAsync();
        }

        public async Task<Property?> GetPropertyByIdAsync(Guid id)
        {
            return await _unitOfWork.Properties.GetPropertyWithDetailsAsync(id);
        }

        public async Task<Property> CreatePropertyAsync(Property property)
        {
            if (await _unitOfWork.Properties.PropertyExistsAsync(property.Address, property.City))
                throw new ArgumentException("Property already exists at this address");

            property.CreatedAt = DateTime.UtcNow;
            property.IsActive = true;

            var createdProperty = await _unitOfWork.Properties.CreateAsync(property);
            await _unitOfWork.CompleteAsync();
            return createdProperty;
        }

        public async Task UpdatePropertyAsync(Property property)
        {
            var existingProperty = await _unitOfWork.Properties.GetByIdAsync(property.Id);
            if (existingProperty == null)
                throw new KeyNotFoundException("Property not found");

            _unitOfWork.Properties.UpdateAsync(property);
            await _unitOfWork.CompleteAsync();
        }

        public async Task DeletePropertyAsync(Guid id)
        {
            var property = await _unitOfWork.Properties.GetByIdAsync(id);
            if (property == null)
                throw new KeyNotFoundException("Property not found");

            await _unitOfWork.Properties.DeleteAsync(property);
            await _unitOfWork.CompleteAsync();
        }

        public async Task<IEnumerable<Property>> SearchPropertiesAsync(string city, decimal? minPrice, decimal? maxPrice, int? bedrooms, string propertyType)
        {
            return await _unitOfWork.Properties.SearchPropertiesAsync(city, minPrice, maxPrice, bedrooms, propertyType);
        }

        public async Task<IEnumerable<Property>> GetPropertiesByAgentAsync(Guid agentId)
        {
            return await _unitOfWork.Properties.GetPropertiesByAgentAsync(agentId);
        }

        public async Task<IEnumerable<Property>> GetPropertiesByOwnerAsync(Guid ownerId)
        {
            return await _unitOfWork.Properties.GetPropertiesByOwnerAsync(ownerId);
        }

        public async Task AddPropertyImageAsync(Guid propertyId, PropertyImage image)
        {
            var property = await _unitOfWork.Properties.GetByIdAsync(propertyId);
            if (property == null)
                throw new KeyNotFoundException("Property not found");

            image.PropertyId = propertyId;
            image.CreatedAt = DateTime.UtcNow;

            // If this is the first image, set it as primary
            if (!property.Images.Any())
                image.IsPrimary = true;

            await _unitOfWork.CompleteAsync();
        }
    }

}
