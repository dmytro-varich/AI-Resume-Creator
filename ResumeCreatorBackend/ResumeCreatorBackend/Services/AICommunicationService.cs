using Microsoft.AspNetCore.Http;

namespace ResumeCreatorBackend.Services
{
    public class AICommunicationService
    {
        private readonly IConfiguration _configuration;

        public AICommunicationService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<HttpResponseMessage> SendRequest(HttpClient client, string message)
        {
            // Get the base url from the configuration
            var baseUrl = _configuration["ApiSettings:BaseUrl"];

            // Create the request url with the message
            string apiUrl = $"{baseUrl}?message={Uri.EscapeDataString(message)}";

            // Create a GET request with the given url
            var request = new HttpRequestMessage(HttpMethod.Get, apiUrl);

            // Send the request using given client and get the response
            HttpResponseMessage response = await client.SendAsync(request);

            return response;
        }


    }
}
