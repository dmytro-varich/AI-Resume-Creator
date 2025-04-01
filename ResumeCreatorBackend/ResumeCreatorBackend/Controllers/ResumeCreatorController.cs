using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ResumeCreatorBackend.Data;
using ResumeCreatorBackend.Models;
using ResumeCreatorBackend.Services;
using System.ComponentModel.DataAnnotations;

namespace ResumeCreatorBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResumeCreatorController : ControllerBase
    {
        public class ResourcesLinksTemp
        {
            public string LinkerdInLink { get; set; }

            public string GitHubLink { get; set; }
        }

        [HttpPost("CreateResumeFromResources")]
        public IActionResult Index()
        {
            return BadRequest();
        }
    }
}
