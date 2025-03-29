using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ResumeCreatorBackend.Data;
using ResumeCreatorBackend.Models;
using ResumeCreatorBackend.Services;
using System.ComponentModel.DataAnnotations;

namespace ResumeCreatorBackend.Controllers
{
    public class CreateAccountTemp
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccount([FromBody] CreateAccountTemp receivedModel)
        {
            if (receivedModel == null)
            {
                return BadRequest("Account data is required.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _accountService.CreateAccount(receivedModel.Email, receivedModel.Password);
                return Ok("Account created successfully.");
            }
            catch(Exception ex)
            {
                return StatusCode(500, "An unexpected error occured while creating the user.");
            }

        }
    }
}
