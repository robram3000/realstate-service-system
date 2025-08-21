using System.Net;
using System.Net.Mail;

namespace realstate_service_system.Server.Services.Implement.API
{
    public class SMTPServices : ISMTPServices
    {
        private readonly SmtpClient _smtpClient;
        private readonly string _fromEmail;
        private readonly string _fromName;
        private readonly ILogger<SMTPServices> _logger;

        public SMTPServices(IConfiguration configuration, ILogger<SMTPServices> logger)
        {
            _logger = logger;

            // Read SMTP configuration from appsettings.json
            var smtpConfig = configuration.GetSection("SmtpSettings");

            _fromEmail = smtpConfig["FromEmail"] ?? throw new ArgumentNullException("FromEmail is not configured");
            _fromName = smtpConfig["FromName"] ?? "Real Estate System";

            _smtpClient = new SmtpClient(smtpConfig["Host"])
            {
                Port = int.Parse(smtpConfig["Port"] ?? "587"),
                Credentials = new NetworkCredential(
                    smtpConfig["Username"],
                    smtpConfig["Password"]
                ),
                EnableSsl = bool.Parse(smtpConfig["EnableSsl"] ?? "true"),
                Timeout = 10000 // 10 seconds timeout
            };
        }

        public async Task<bool> SendEmailAsync(string toEmail, string subject, string body, bool isHtml = false)
        {
            try
            {
                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_fromEmail, _fromName),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = isHtml
                };

                mailMessage.To.Add(toEmail);

                await _smtpClient.SendMailAsync(mailMessage);

                _logger.LogInformation($"Email sent successfully to {toEmail}");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to send email to {toEmail}");
                return false;
            }
        }

        public async Task<bool> SendEmailWithAttachmentAsync(string toEmail, string subject, string body,
            byte[] attachmentData, string attachmentName, string contentType = "application/pdf")
        {
            try
            {
                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_fromEmail, _fromName),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };

                mailMessage.To.Add(toEmail);

                // Create attachment
                var stream = new MemoryStream(attachmentData);
                var attachment = new Attachment(stream, attachmentName, contentType);
                mailMessage.Attachments.Add(attachment);

                await _smtpClient.SendMailAsync(mailMessage);

                _logger.LogInformation($"Email with attachment sent successfully to {toEmail}");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to send email with attachment to {toEmail}");
                return false;
            }
        }

        public async Task<bool> SendBulkEmailAsync(List<string> toEmails, string subject, string body, bool isHtml = false)
        {
            try
            {
                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_fromEmail, _fromName),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = isHtml
                };

                foreach (var email in toEmails)
                {
                    mailMessage.Bcc.Add(email); // Use BCC to hide recipient emails from each other
                }

                await _smtpClient.SendMailAsync(mailMessage);

                _logger.LogInformation($"Bulk email sent successfully to {toEmails.Count} recipients");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send bulk email");
                return false;
            }
        }

        // Real estate specific email templates
        public async Task<bool> SendPropertyListingNotificationAsync(string toEmail, string recipientName,
            string propertyTitle, string propertyUrl)
        {
            var subject = $"New Property Listing: {propertyTitle}";
            var body = $@"
                <html>
                <body>
                    <h2>Hello {recipientName},</h2>
                    <p>A new property has been listed that matches your preferences:</p>
                    <h3>{propertyTitle}</h3>
                    <p>Click <a href='{propertyUrl}'>here</a> to view the property details.</p>
                    <br/>
                    <p>Best regards,<br/>Real Estate Team</p>
                </body>
                </html>";

            return await SendEmailAsync(toEmail, subject, body, true);
        }

        public async Task<bool> SendAppointmentConfirmationAsync(string toEmail, string recipientName,
            DateTime appointmentDate, string propertyAddress, string agentName)
        {
            var subject = $"Appointment Confirmation - {propertyAddress}";
            var body = $@"
                <html>
                <body>
                    <h2>Hello {recipientName},</h2>
                    <p>Your property viewing appointment has been confirmed:</p>
                    <p><strong>Property:</strong> {propertyAddress}</p>
                    <p><strong>Date & Time:</strong> {appointmentDate:MMMM dd, yyyy at hh:mm tt}</p>
                    <p><strong>Agent:</strong> {agentName}</p>
                    <br/>
                    <p>Please arrive 5 minutes early. If you need to reschedule, please contact us at least 24 hours in advance.</p>
                    <br/>
                    <p>Best regards,<br/>Real Estate Team</p>
                </body>
                </html>";

            return await SendEmailAsync(toEmail, subject, body, true);
        }

        public async Task<bool> SendContractDocumentAsync(string toEmail, string recipientName,
            byte[] contractPdf, string propertyAddress)
        {
            var subject = $"Contract Document - {propertyAddress}";
            var body = $@"
                <html>
                <body>
                    <h2>Hello {recipientName},</h2>
                    <p>Please find attached the contract document for the property at {propertyAddress}.</p>
                    <p>Please review the document carefully and contact us if you have any questions.</p>
                    <br/>
                    <p>Best regards,<br/>Real Estate Team</p>
                </body>
                </html>";

            return await SendEmailWithAttachmentAsync(toEmail, subject, body, contractPdf,
                $"Contract_{propertyAddress.Replace(" ", "_")}.pdf");
        }

        public async Task<bool> SendWelcomeEmailAsync(string toEmail, string recipientName)
        {
            var subject = "Welcome to Our Real Estate Platform";
            var body = $@"
                <html>
                <body>
                    <h2>Welcome {recipientName}!</h2>
                    <p>Thank you for joining our real estate platform. We're excited to help you find your dream property.</p>
                    <p>Here's what you can do:</p>
                    <ul>
                        <li>Browse thousands of properties</li>
                        <li>Schedule property viewings</li>
                        <li>Get personalized property recommendations</li>
                        <li>Connect with professional real estate agents</li>
                    </ul>
                    <br/>
                    <p>If you have any questions, don't hesitate to contact our support team.</p>
                    <br/>
                    <p>Best regards,<br/>Real Estate Team</p>
                </body>
                </html>";

            return await SendEmailAsync(toEmail, subject, body, true);
        }

        public void Dispose()
        {
            _smtpClient?.Dispose();
            GC.SuppressFinalize(this);
        }

    }
}