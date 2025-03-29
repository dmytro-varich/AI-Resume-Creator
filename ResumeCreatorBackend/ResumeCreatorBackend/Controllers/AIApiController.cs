using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace ResumeCreatorBackend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AIApiController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public AIApiController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        private async Task<HttpResponseMessage> SendAPIRequest(HttpClient client, string message)
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

        [HttpPost("process")]
        public async Task<IActionResult> ProcessMessage([FromBody] string message)
        {
            // Check if prompt is empty
            if (string.IsNullOrWhiteSpace(message))
            {
                return BadRequest("Prompt cannot be empty.");
            }

            // Create http client
            var client = _httpClientFactory.CreateClient();

            // Get the AI API response for the given request message
            HttpResponseMessage response = await SendAPIRequest(client, message);

            if (response.IsSuccessStatusCode)
            {
                var resultContent = await response.Content.ReadAsStringAsync();
                return Ok(resultContent);
            }
            else
            {
                return StatusCode((int)response.StatusCode, $"API answered with {await response.Content.ReadAsStringAsync()}");
            }
        }
    }
}
