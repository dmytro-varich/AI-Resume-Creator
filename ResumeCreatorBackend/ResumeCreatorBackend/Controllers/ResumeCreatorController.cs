using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ResumeCreatorBackend.Data;
using ResumeCreatorBackend.Models;
using ResumeCreatorBackend.Services;
using System.ComponentModel.DataAnnotations;
using System.Net.Http;

namespace ResumeCreatorBackend.Controllers
{
    public class UserInputTemp
    {
        public string LinkerdInLink { get; set; }
        public string GitHubLink { get; set; }
        public string? UserPrompt { get; set; }

    }

    [Route("api/[controller]")]
    [ApiController]
    public class ResumeCreatorController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ParserService _parserService;
        private readonly AICommunicationService _aiCommunicationService;

        public ResumeCreatorController(IHttpClientFactory httpClientFactory, ParserService parserService, AICommunicationService aiCommunicationService)
        {
            _httpClientFactory = httpClientFactory;
            _parserService = parserService;
            _aiCommunicationService = aiCommunicationService;
        }

        [HttpPost("CreateResumeFromResources")]
        public async Task<IActionResult> CreateResumeAsync([FromBody] UserInputTemp userInputTemp)
        {
            if (userInputTemp == null)
            {
                return BadRequest("Action requires 2 given links.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Create http client
            var client = _httpClientFactory.CreateClient();
            client.Timeout = TimeSpan.FromMinutes(5);

            Dictionary<string, object> resourcesLinks = new Dictionary<string, object>
            {
                {"linkedInLink", "mockupLink1"},
                {"gitHubLink", "mockupLink2"}
            };

            // Get data from the parser
            Dictionary<string, object> gatheredData = await _parserService.GetResponseAsDictionaryMockUp(client, "http//parserUrlMockup", resourcesLinks);

            if (gatheredData == null) {
                return StatusCode(503, "Parser service answered with no data");
            }

            // Create prompt from extracted data
            string dataPrompt = _aiCommunicationService.CreateDataPrompt(gatheredData);

            string promptForSending = dataPrompt + " " + userInputTemp.UserPrompt;

            // Send request to the AI API to write resume code
            HttpResponseMessage response = await _aiCommunicationService.SendRequestAsync(client, promptForSending, modelName: "deepseek-r1:latest");

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
