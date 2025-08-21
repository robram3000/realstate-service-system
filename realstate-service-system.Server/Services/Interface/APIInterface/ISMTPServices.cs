namespace realstate_service_system.Server.Services.Interface.APIInterface
{
    public interface ISMTPServices : IDisposable
    {
        Task<bool> SendEmailAsync(string toEmail, string subject, string body, bool isHtml = false);
        Task<bool> SendEmailWithAttachmentAsync(string toEmail, string subject, string body,
            byte[] attachmentData, string attachmentName, string contentType = "application/pdf");
        Task<bool> SendBulkEmailAsync(List<string> toEmails, string subject, string body, bool isHtml = false);
        Task<bool> SendPropertyListingNotificationAsync(string toEmail, string recipientName,
            string propertyTitle, string propertyUrl);
        Task<bool> SendAppointmentConfirmationAsync(string toEmail, string recipientName,
            DateTime appointmentDate, string propertyAddress, string agentName);
        Task<bool> SendContractDocumentAsync(string toEmail, string recipientName,
            byte[] contractPdf, string propertyAddress);
        Task<bool> SendWelcomeEmailAsync(string toEmail, string recipientName);
    }
}
