using Microsoft.AspNetCore.Http;
using System.Text;

namespace ResumeCreatorBackend.Services
{
    public class AICommunicationService
    {
        private readonly IConfiguration _configuration;
        private const string _resumeSystemPrompt = "Use data from message and generate ONLY " +
                "a latex template for a good IT resume and fill known resume " +
                "data with given data from message. Do not generate anything else except latex code";

        public AICommunicationService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string CreateDataPrompt(Dictionary<string, object> dataDictionary)
        {
            var sb = new StringBuilder();
            foreach (var kvp in dataDictionary)
            {
                if(kvp.Value != null)
                {
                    sb.Append($"{kvp.Key}:{kvp.Value}, ");
                }
            }

            string prompt = sb.ToString();

            return prompt;
        }

        public async Task<HttpResponseMessage> SendRequestAsync(HttpClient client, string message, string modelName="mistral:latest", string systemPrompt = _resumeSystemPrompt)
        {
            // Get the base url from the configuration
            var baseUrl = _configuration["ApiSettings:BaseUrl"];

            string apiUrl;
            // Create the request url with the model, message, system prompt
            if (systemPrompt != "")
            {
                apiUrl = $"{baseUrl}/{Uri.EscapeDataString(modelName)}?message={Uri.EscapeDataString(message)}&system_prompt={Uri.EscapeDataString(systemPrompt)}";
            }
            else
            {
                apiUrl = $"{baseUrl}/{Uri.EscapeDataString(modelName)}?message={Uri.EscapeDataString(message)}";
            }

            // Create a GET request with the given url
            var request = new HttpRequestMessage(HttpMethod.Get, apiUrl);

            // Send the request using given client and get the response
            HttpResponseMessage response = await client.SendAsync(request);

            return response;
        }


    }
}
