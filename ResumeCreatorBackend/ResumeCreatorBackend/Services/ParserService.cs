using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using ResumeCreatorBackend.Controllers;
using ResumeCreatorBackend.Data;
using ResumeCreatorBackend.Models;
using System.Runtime.CompilerServices;


namespace ResumeCreatorBackend.Services
{
    public class ParserService
    {
        public ParserService() { }

        public async Task<Dictionary<string, object>> GetResponseAsDictionaryMockUp(HttpClient client, string parserUrl, object payload)
        {
            Dictionary<string, object> resultObjects = new Dictionary<string, object>{
                {"name", "John" },
                {"surname", "Smith" },
                {"university", "TUKE" },
                {"job_title", "Sales Manager" },
                {"work_experience", "5 years" },
                {"skills", "Python, C#, Sales, Marketing" }

            };
            

            return resultObjects;
        }

        public async Task<Dictionary<string, object>> PostPayloadDictionaryAndGetResponseAsDictionaryAsync(HttpClient client, string parserUrl, object payload)
        {
            // PostAsJson
            HttpResponseMessage response = await client.PostAsJsonAsync(parserUrl, payload);
            response.EnsureSuccessStatusCode();


            Dictionary<string, object> resultObjects = await response.Content.ReadFromJsonAsync<Dictionary<string, object>>();

            return resultObjects;
        }
    }
}
