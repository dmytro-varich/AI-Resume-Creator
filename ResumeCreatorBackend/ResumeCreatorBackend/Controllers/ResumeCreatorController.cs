using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ResumeCreatorBackend.Data;
using ResumeCreatorBackend.Models;
using ResumeCreatorBackend.Services;
using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using System;
using System.Collections.Generic;
using System.Text.Json;

namespace ResumeCreatorBackend.Controllers
{
    public class UserInputTemp
    {
        //public string LinkerdInLink { get; set; }
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
            client.Timeout = TimeSpan.FromMinutes(10);

            Dictionary<string, object> resourcesLinks = new Dictionary<string, object>
            {
                {"GitHub", userInputTemp.GitHubLink}
            };

            // Get data from the parser  
            HttpResponseMessage response = await client.PostAsJsonAsync("http://parser:5000/user", resourcesLinks);
            response.EnsureSuccessStatusCode();

            Dictionary<string, object> resultObjects = await response.Content.ReadFromJsonAsync<Dictionary<string, object>>();

            if (resultObjects == null) {
                return StatusCode(503, "Parser service answered with no data");
            }

            // Create prompt from extracted data
            string dataPrompt = _aiCommunicationService.CreateDataPrompt(resultObjects);

            string promptForSending = dataPrompt + " " + userInputTemp.UserPrompt;

            // Get the AI API response for the given request message
            HttpResponseMessage aiAPIresponse = await _aiCommunicationService.SendRequestAsync(client, promptForSending, modelName: "deepseek-r1:latest");

            if (aiAPIresponse.IsSuccessStatusCode)
            {
                var resultContent = await aiAPIresponse.Content.ReadAsStringAsync();
                return Ok(resultContent);
            }
            else
            {
                return StatusCode((int)aiAPIresponse.StatusCode, $"API answered with {await aiAPIresponse.Content.ReadAsStringAsync()}");
            }
        }
    }
}
