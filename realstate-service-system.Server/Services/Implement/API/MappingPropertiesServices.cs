//using System.Text.Json;
//using Microsoft.Extensions.Caching.Memory;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.Logging;
//using realstate_service_system.Server.Models;
//using realstate_service_system.Server.Models.Entities.RealstateProperties;


//namespace realstate_service_system.Server.Services.Implement.API
//{
//    public class MappingPropertiesServices : IMappingPropertiesServices
//    {
//        private readonly HttpClient _httpClient;
//        private readonly IConfiguration _configuration;
//        private readonly ILogger<MappingPropertiesServices> _logger;
//        private readonly IMemoryCache _memoryCache;

//        public MappingPropertiesServices(HttpClient httpClient, IConfiguration configuration,
//            ILogger<MappingPropertiesServices> logger, IMemoryCache memoryCache)
//        {
//            _httpClient = httpClient;
//            _configuration = configuration;
//            _logger = logger;
//            _memoryCache = memoryCache;

//            _httpClient.Timeout = TimeSpan.FromSeconds(30);
//        }

//        public async Task<GeoCoordinate?> GeocodeAddressAsync(string address)
//        {
//            try
//            {
//                var cacheKey = $"geocode_{address}";
//                if (_memoryCache.TryGetValue(cacheKey, out GeoCoordinate? cachedCoordinate))
//                {
//                    return cachedCoordinate;
//                }

//                var googleMapsConfig = _configuration.GetSection("GoogleMaps");
//                var apiKey = googleMapsConfig["ApiKey"];

//                if (string.IsNullOrEmpty(apiKey))
//                {
//                    _logger.LogError("Google Maps API key is not configured");
//                    return null;
//                }

//                var encodedAddress = Uri.EscapeDataString(address);
//                var url = $"https://maps.googleapis.com/maps/api/geocode/json?address={encodedAddress}&key={apiKey}";

//                var response = await _httpClient.GetAsync(url);

//                if (!response.IsSuccessStatusCode)
//                {
//                    _logger.LogError($"Geocoding failed. Status: {response.StatusCode}");
//                    return null;
//                }

//                var content = await response.Content.ReadAsStringAsync();
//                var geocodeResponse = JsonSerializer.Deserialize<GoogleGeocodeResponse>(content);

//                if (geocodeResponse?.Results?.FirstOrDefault()?.Geometry?.Location is { } location)
//                {
//                    var coordinate = new GeoCoordinate(location.Lat, location.Lng);

//                    // Cache for 24 hours
//                    _memoryCache.Set(cacheKey, coordinate, TimeSpan.FromHours(24));

//                    return coordinate;
//                }

//                _logger.LogWarning($"No geocoding results found for address: {address}");
//                return null;
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex, $"Error geocoding address: {address}");
//                return null;
//            }
//        }

//        public async Task<List<Property>> FindPropertiesWithinRadiusAsync(GeoCoordinate center, double radiusKm, List<Property> properties)
//        {
//            var nearbyProperties = new List<Property>();

//            foreach (var property in properties)
//            {
//                if (property.Latitude.HasValue && property.Longitude.HasValue)
//                {
//                    var propertyCoord = new GeoCoordinate(property.Latitude.Value, property.Longitude.Value);
//                    var distance = CalculateDistance(center, propertyCoord);

//                    if (distance <= radiusKm)
//                    {
//                        nearbyProperties.Add(property);
//                    }
//                }
//            }

//            return nearbyProperties.OrderBy(p =>
//                CalculateDistance(center, new GeoCoordinate(p.Latitude!.Value, p.Longitude!.Value))
//            ).ToList();
//        }

//        public async Task<MapBounds> CalculateMapBoundsAsync(List<Property> properties)
//        {
//            if (properties == null || !properties.Any(p => p.Latitude.HasValue && p.Longitude.HasValue))
//            {
//                return new MapBounds(0, 0, 0, 0);
//            }

//            var validProperties = properties.Where(p => p.Latitude.HasValue && p.Longitude.HasValue).ToList();

//            var minLat = validProperties.Min(p => p.Latitude!.Value);
//            var maxLat = validProperties.Max(p => p.Latitude!.Value);
//            var minLng = validProperties.Min(p => p.Longitude!.Value);
//            var maxLng = validProperties.Max(p => p.Longitude!.Value);

//            return new MapBounds(minLat, minLng, maxLat, maxLng);
//        }

//        public async Task<string> GenerateStaticMapUrlAsync(List<Property> properties, int width = 600, int height = 400)
//        {
//            try
//            {
//                var googleMapsConfig = _configuration.GetSection("GoogleMaps");
//                var apiKey = googleMapsConfig["ApiKey"];

//                if (string.IsNullOrEmpty(apiKey))
//                {
//                    _logger.LogError("Google Maps API key is not configured");
//                    return string.Empty;
//                }

//                if (!properties.Any(p => p.Latitude.HasValue && p.Longitude.HasValue))
//                {
//                    return string.Empty;
//                }

//                var markers = new List<string>();
//                foreach (var property in properties.Where(p => p.Latitude.HasValue && p.Longitude.HasValue))
//                {
//                    markers.Add($"markers=color:red%7Clabel:P%7C{property.Latitude},{property.Longitude}");
//                }

//                var markersString = string.Join("&", markers);
//                var center = await CalculateCenterAsync(properties);

//                return $"https://maps.googleapis.com/maps/api/staticmap?center={center.Latitude},{center.Longitude}&zoom=13&size={width}x{height}&{markersString}&key={apiKey}";
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex, "Error generating static map URL");
//                return string.Empty;
//            }
//        }

//        public async Task<GeoCoordinate> CalculateCenterAsync(List<Property> properties)
//        {
//            var validProperties = properties.Where(p => p.Latitude.HasValue && p.Longitude.HasValue).ToList();

//            if (!validProperties.Any())
//            {
//                return new GeoCoordinate(0, 0);
//            }

//            var avgLat = validProperties.Average(p => p.Latitude!.Value);
//            var avgLng = validProperties.Average(p => p.Longitude!.Value);

//            return new GeoCoordinate(avgLat, avgLng);
//        }

//        public double CalculateDistance(GeoCoordinate coord1, GeoCoordinate coord2)
//        {
//            // Haversine formula to calculate distance between two coordinates
//            const double earthRadiusKm = 6371;

//            var dLat = ToRadians(coord2.Latitude - coord1.Latitude);
//            var dLon = ToRadians(coord2.Longitude - coord1.Longitude);

//            var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
//                   Math.Cos(ToRadians(coord1.Latitude)) * Math.Cos(ToRadians(coord2.Latitude)) *
//                   Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

//            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
//            return earthRadiusKm * c;
//        }

//        private double ToRadians(double degrees)
//        {
//            return degrees * (Math.PI / 180);
//        }
//    }

//    public interface IMappingPropertiesServices
//    {
//        Task<GeoCoordinate?> GeocodeAddressAsync(string address);
//        Task<List<Property>> FindPropertiesWithinRadiusAsync(GeoCoordinate center, double radiusKm, List<Property> properties);
//        Task<MapBounds> CalculateMapBoundsAsync(List<Property> properties);
//        Task<string> GenerateStaticMapUrlAsync(List<Property> properties, int width = 600, int height = 400);
//        Task<GeoCoordinate> CalculateCenterAsync(List<Property> properties);
//        double CalculateDistance(GeoCoordinate coord1, GeoCoordinate coord2);
//    }

//    // Supporting classes
//    public class GeoCoordinate
//    {
//        public double Latitude { get; }
//        public double Longitude { get; }

//        public GeoCoordinate(double latitude, double longitude)
//        {
//            Latitude = latitude;
//            Longitude = longitude;
//        }
//    }

//    public class MapBounds
//    {
//        public double South { get; }
//        public double West { get; }
//        public double North { get; }
//        public double East { get; }

//        public MapBounds(double south, double west, double north, double east)
//        {
//            South = south;
//            West = west;
//            North = north;
//            East = east;
//        }
//    }

//    public class GoogleGeocodeResponse
//    {
//        public List<GoogleGeocodeResult>? Results { get; set; }
//    }

//    public class GoogleGeocodeResult
//    {
//        public GoogleGeometry? Geometry { get; set; }
//    }

//    public class GoogleGeometry
//    {
//        public GoogleLocation? Location { get; set; }
//    }

//    public class GoogleLocation
//    {
//        public double Lat { get; set; }
//        public double Lng { get; set; }
//    }
//}