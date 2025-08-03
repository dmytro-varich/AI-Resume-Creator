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
        public string Name { get; set; }

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
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("CreateAccountAsync")]
        public async Task<IActionResult> CreateAccountAsync([FromBody] CreateAccountTemp? receivedModel)
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
                await _accountService.CreateAccountAsync(receivedModel.Name, receivedModel.Email, receivedModel.Password);
                return Ok("Account created successfully.");
            }
            catch(InvalidOperationException ex)
            {
                return BadRequest("Account with the given email already exists.");
            }
            catch(Exception ex)
            {
                return StatusCode(500, "An unexpected error occured while creating the user.");
            }

        }

        [HttpPost("VerifyPasswordAsync")]
        public async Task<IActionResult> VerifyPasswordAsync([FromBody] CreateAccountTemp? receivedModel)
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
                if(await _accountService.VerifyPasswordByEmailAsync(receivedModel.Email, receivedModel.Password))
                {
                    var account = await _accountService.GetAccountAsync(receivedModel.Email);

                    Dictionary<string, string> returnValues = new Dictionary<string, string>()
                    {
                        {"name", account.Name },
                        {"email", account.Email }
                    };

                    return Ok(returnValues);
                }
                return Unauthorized("Password is invalid.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound($"There is no user with the {receivedModel.Email} email.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
    }
}
