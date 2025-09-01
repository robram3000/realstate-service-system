
﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using realstate_service_system.Server.Models.Entities.RealstateProperties;
using realstate_service_system.Server.Services.Interface.Properties;

namespace realstate_service_system.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertyService _propertyService;

        public PropertiesController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllProperties()
        {
            var properties = await _propertyService.GetAllPropertiesAsync();
            return Ok(properties);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyById(Guid id)
        {
            var property = await _propertyService.GetPropertyByIdAsync(id);
            if (property == null) return NotFound();
            return Ok(property);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin,Agent")]
        public async Task<IActionResult> CreateProperty([FromBody] Property property)
        {
            try
            {
                var createdProperty = await _propertyService.CreatePropertyAsync(property);
                return CreatedAtAction(nameof(GetPropertyById), new { id = createdProperty.Id }, createdProperty);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin,Admin,Agent")]
        public async Task<IActionResult> UpdateProperty(Guid id, [FromBody] Property property)
        {
            if (id != property.Id) return BadRequest();

            try
            {
                await _propertyService.UpdatePropertyAsync(property);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin,Admin")]
        public async Task<IActionResult> DeleteProperty(Guid id)
        {
            try
            {
                await _propertyService.DeletePropertyAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet("search")]
        [AllowAnonymous]
        public async Task<IActionResult> SearchProperties(
            [FromQuery] string city = "",
            [FromQuery] decimal? minPrice = null,
            [FromQuery] decimal? maxPrice = null,
            [FromQuery] int? bedrooms = null,
            [FromQuery] string propertyType = "")
        {
            var properties = await _propertyService.SearchPropertiesAsync(city, minPrice, maxPrice, bedrooms, propertyType);
            return Ok(properties);
        }
    }

}