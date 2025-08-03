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

        [Fact]
        public async Task CreateAccountAsync_InvalidName_ReturnsBadRequest()
        {
            var createAccountTempModel = new CreateAccountTemp();

            var mockAccountService = new Mock<IAccountService>();
            var accountController = new AccountController(mockAccountService.Object);

            accountController.ModelState.AddModelError("Name", "Name is invalid.");

            var result = await accountController.CreateAccountAsync(createAccountTempModel);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            var returnedModelState = Assert.IsType<SerializableError>(badRequest.Value);

            Assert.True(returnedModelState.ContainsKey("Name"));
        }

        [Fact]
        public async Task CreateAccountAsync_InvalidEmail_ReturnsBadRequest()
        {
            var createAccountTempModel = new CreateAccountTemp();

            var mockAccountService = new Mock<IAccountService>();
            var accountController = new AccountController(mockAccountService.Object);

            accountController.ModelState.AddModelError("Email", "Email is invalid.");

            var result = await accountController.CreateAccountAsync(createAccountTempModel);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            var returnedModelState = Assert.IsType<SerializableError>(badRequest.Value);

            Assert.True(returnedModelState.ContainsKey("Email"));
        }

        [Fact]
        public async Task CreateAccountAsync_InvalidPassword_ReturnsBadRequest()
        {
            var createAccountTempModel = new CreateAccountTemp();

            var mockAccountService = new Mock<IAccountService>();
            var accountController = new AccountController(mockAccountService.Object);

            accountController.ModelState.AddModelError("Password", "Password is invalid.");

            var result = await accountController.CreateAccountAsync(createAccountTempModel);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            var returnedModelState = Assert.IsType<SerializableError>(badRequest.Value);

            Assert.True(returnedModelState.ContainsKey("Password"));
        }
    }
}