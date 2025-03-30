using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;
using Microsoft.Extensions.Configuration;
using ResumeCreatorBackend.Services;

namespace ResumeCreatorBackend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AICommunicationController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly AICommunicationService _aiCommunicationService;

        public AICommunicationController(IHttpClientFactory httpClientFactory, AICommunicationService aiCommunicationService)
        {
            _httpClientFactory = httpClientFactory;
            _aiCommunicationService = aiCommunicationService;
        }

        [HttpPost("process")]
        public async Task<IActionResult> ProcessMessageAsync([FromBody] string message)
        {
            // Check if prompt is empty
            if (string.IsNullOrWhiteSpace(message))
            {
                return BadRequest("Prompt cannot be empty.");
            }

            // Create http client
            var client = _httpClientFactory.CreateClient();

            // Get the AI API response for the given request message
            HttpResponseMessage response = await _aiCommunicationService.SendRequestAsync(client, message);

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
