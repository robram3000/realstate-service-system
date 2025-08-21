using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using realstate_service_system.Server.Services.Interfaces.API;

namespace realstate_service_system.Server.Services.Implement.API
{
    public class MSender : IMSender
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly ILogger<MSender> _logger;

        public MSender(HttpClient httpClient, IConfiguration configuration, ILogger<MSender> logger)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _logger = logger;

            // Configure HttpClient timeout
            _httpClient.Timeout = TimeSpan.FromSeconds(30);
        }

        public async Task<bool> SendPushNotificationAsync(string deviceToken, string title, string message, Dictionary<string, string>? data = null)
        {
            try
            {
                var firebaseConfig = _configuration.GetSection("Firebase");
                var serverKey = firebaseConfig["ServerKey"];

                if (string.IsNullOrEmpty(serverKey))
                {
                    _logger.LogError("Firebase ServerKey is not configured");
                    return false;
                }

                var payload = new
                {
                    to = deviceToken,
                    notification = new
                    {
                        title = title,
                        body = message,
                        sound = "default"
                    },
                    data = data ?? new Dictionary<string, string>(),
                    priority = "high"
                };

                var jsonPayload = JsonSerializer.Serialize(payload);
                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                _httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", $"key={serverKey}");

                var response = await _httpClient.PostAsync("https://fcm.googleapis.com/fcm/send", content);

                if (response.IsSuccessStatusCode)
                {
                    _logger.LogInformation($"Push notification sent successfully to device: {deviceToken}");
                    return true;
                }
                else
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    _logger.LogError($"Failed to send push notification. Status: {response.StatusCode}, Response: {responseContent}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error sending push notification to device: {deviceToken}");
                return false;
            }
        }

        public async Task<bool> SendSMSAsync(string phoneNumber, string message)
        {
            try
            {
                var twilioConfig = _configuration.GetSection("Twilio");
                var accountSid = twilioConfig["AccountSid"];
                var authToken = twilioConfig["AuthToken"];
                var fromNumber = twilioConfig["FromNumber"];

                if (string.IsNullOrEmpty(accountSid) || string.IsNullOrEmpty(authToken) || string.IsNullOrEmpty(fromNumber))
                {
                    _logger.LogError("Twilio configuration is incomplete");
                    return false;
                }

                // For Twilio API implementation, you would typically use Twilio NuGet package
                // This is a simplified example using HttpClient

                var url = $"https://api.twilio.com/2010-04-01/Accounts/{accountSid}/Messages.json";

                var parameters = new Dictionary<string, string>
                {
                    ["To"] = phoneNumber,
                    ["From"] = fromNumber,
                    ["Body"] = message
                };

                var content = new FormUrlEncodedContent(parameters);

                var byteArray = Encoding.ASCII.GetBytes($"{accountSid}:{authToken}");
                _httpClient.DefaultRequestHeaders.Authorization =
                    new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));

                var response = await _httpClient.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    _logger.LogInformation($"SMS sent successfully to: {phoneNumber}");
                    return true;
                }
                else
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    _logger.LogError($"Failed to send SMS. Status: {response.StatusCode}, Response: {responseContent}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error sending SMS to: {phoneNumber}");
                return false;
            }
        }

        public async Task<bool> SendBulkPushNotificationsAsync(List<string> deviceTokens, string title, string message, Dictionary<string, string>? data = null)
        {
            var results = new List<bool>();

            foreach (var token in deviceTokens)
            {
                var result = await SendPushNotificationAsync(token, title, message, data);
                results.Add(result);

                // Small delay to avoid rate limiting
                await Task.Delay(100);
            }

            return results.All(r => r);
        }

        public async Task<bool> SendPropertyAlertAsync(string deviceToken, string propertyTitle, string propertyId, string alertType)
        {
            var data = new Dictionary<string, string>
            {
                ["propertyId"] = propertyId,
                ["alertType"] = alertType,
                ["click_action"] = "FLUTTER_NOTIFICATION_CLICK"
            };

            var title = "Property Alert";
            var message = alertType switch
            {
                "new" => $"New property listed: {propertyTitle}",
                "price_drop" => $"Price dropped for: {propertyTitle}",
                "viewing_confirmed" => $"Viewing confirmed for: {propertyTitle}",
                _ => $"Update for property: {propertyTitle}"
            };

            return await SendPushNotificationAsync(deviceToken, title, message, data);
        }

        public async Task<bool> SendAppointmentReminderAsync(string deviceToken, string propertyAddress, DateTime appointmentTime, string agentName)
        {
            var data = new Dictionary<string, string>
            {
                ["type"] = "appointment_reminder",
                ["appointmentTime"] = appointmentTime.ToString("O"),
                ["agentName"] = agentName
            };

            var title = "Appointment Reminder";
            var message = $"Your viewing at {propertyAddress} is scheduled for {appointmentTime:MMM dd, h:mm tt} with {agentName}";

            return await SendPushNotificationAsync(deviceToken, title, message, data);
        }
    }

    public interface IMSender
    {
        Task<bool> SendPushNotificationAsync(string deviceToken, string title, string message, Dictionary<string, string>? data = null);
        Task<bool> SendSMSAsync(string phoneNumber, string message);
        Task<bool> SendBulkPushNotificationsAsync(List<string> deviceTokens, string title, string message, Dictionary<string, string>? data = null);
        Task<bool> SendPropertyAlertAsync(string deviceToken, string propertyTitle, string propertyId, string alertType);
        Task<bool> SendAppointmentReminderAsync(string deviceToken, string propertyAddress, DateTime appointmentTime, string agentName);
    }
}