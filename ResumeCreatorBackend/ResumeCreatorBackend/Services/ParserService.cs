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

        public async Task<Dictionary<string, object>> GetResponseAsDictionaryAsync(HttpClient client, string parserUrl, object payload)
        {
            HttpResponseMessage response = await client.PostAsJsonAsync(parserUrl, payload);
            response.EnsureSuccessStatusCode();


            Dictionary<string, object> resultObjects = await response.Content.ReadFromJsonAsync<Dictionary<string, object>>();

            return resultObjects;
        }
    }
}
