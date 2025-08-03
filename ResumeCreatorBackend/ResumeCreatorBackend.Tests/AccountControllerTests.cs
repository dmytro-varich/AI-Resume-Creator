using Xunit;
using ResumeCreatorBackend;
using Moq;
using ResumeCreatorBackend.Services;
using ResumeCreatorBackend.Controllers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace ResumeCreatorBackend.Tests
{
    public class AccountControllerTests
    {
        [Fact]
        public async Task CreateAccountAsync_NullData_ReturnsBadRequest()
        {
            var mockAccountService = new Mock<IAccountService>();
            var accountController = new AccountController(mockAccountService.Object);

            var result = await accountController.CreateAccountAsync(null);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Account data is required.", badRequest.Value);
            
        }
    }
}