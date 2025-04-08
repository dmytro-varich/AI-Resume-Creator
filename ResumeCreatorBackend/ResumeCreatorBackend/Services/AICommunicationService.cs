using Microsoft.AspNetCore.Http;
using System.Text;
using System.Text.Json;

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
            string projectsString = dataDictionary["projects"].ToString();

            // Deserialize the JSON string into a list of dictionaries.
            List<Dictionary<string, JsonElement>> projects =
                JsonSerializer.Deserialize<List<Dictionary<string, JsonElement>>>(projectsString);

            // Create a dictionary keyed by project_name.
            Dictionary<string, Dictionary<string, JsonElement>> projectDictionary =
                new Dictionary<string, Dictionary<string, JsonElement>>();
            foreach (var project in projects)
            {
                // Get the project name from the JSON element.
                string projectName = project["project_name"].GetString();
                projectDictionary[projectName] = project;
            }

            // Initialize the concatenated projects string.
            string projectsConcat = "Relative keywords, skills and technologies: ";

            // Process each project.
            foreach (var project in projectDictionary.Values)
            {
                // Extract and append topics (array of strings).
                if (project.ContainsKey("topics"))
                {
                    foreach (JsonElement topic in project["topics"].EnumerateArray())
                    {
                        // Append each topic followed by a space (or comma if preferred).
                        projectsConcat += topic.GetString() + ", ";
                    }
                }

                // Extract and append language names from the languages object.
                if (project.ContainsKey("languages"))
                {
                    foreach (JsonProperty lang in project["languages"].EnumerateObject())
                    {
                        // Append the language name (the property name) followed by a space.
                        projectsConcat += lang.Name + ", ";
                    }
                }
            }

            // Optionally, trim the trailing whitespace.
            projectsConcat = projectsConcat.Trim();

            return projectsConcat;
        }

        public async Task<HttpResponseMessage> SendRequestAsync(HttpClient client, string message, string modelName="mistral:latest", string systemPrompt = _resumeSystemPrompt)
        {
            // Get the base url from the configuration
            string baseUrl = Environment.GetEnvironmentVariable("AI_API_URL");

            string apiUrl;
            // Create the request url with the model, message, system prompt
            if (systemPrompt != "")
            {
                apiUrl = $"{baseUrl}/{Uri.EscapeDataString(modelName)}?message={Uri.EscapeDataString(message)}&system_prompt={Uri.EscapeDataString(systemPrompt)}&keep_alive=1";
            }
            else
            {
                apiUrl = $"{baseUrl}/{Uri.EscapeDataString(modelName)}?message={Uri.EscapeDataString(message)}&keep_alive=1";
            }

            // Create a GET request with the given url
            var request = new HttpRequestMessage(HttpMethod.Get, apiUrl);

            // Send the request using given client and get the response
            HttpResponseMessage response = await client.SendAsync(request);

            return response;
        }


    }
}
