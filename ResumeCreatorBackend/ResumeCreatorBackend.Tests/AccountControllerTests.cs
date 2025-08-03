using Xunit;
using ResumeCreatorBackend;
using Moq;
using ResumeCreatorBackend.Services;
using ResumeCreatorBackend.Controllers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using ResumeCreatorBackend.Models;

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

        [Fact]
        public async Task CreateAccountAsync_ExistingAccount_ReturnsBadRequest()
        {
            var createAccountTempModel = new CreateAccountTemp() 
            {
                Name = "John12",
                Email = "johny12@gmail.com",
                Password = "password"
            };

            var mockAccountService = new Mock<IAccountService>();
            mockAccountService
                .Setup(s => s.CreateAccountAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .ThrowsAsync(new InvalidOperationException("Account with the given email alredy exists."));

            var accountController = new AccountController(mockAccountService.Object);

            var result = await accountController.CreateAccountAsync(createAccountTempModel);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Account with the given email already exists.", badRequest.Value);
        }

        [Fact]
        public async Task CreateAccountAsync_SuccessfulCreation_ReturnsOk()
        {
            var createAccountTempModel = new CreateAccountTemp()
            {
                Name = "John12",
                Email = "johny12@gmail.com",
                Password = "password"
            };

            var resultingAccountModel = new AccountModel();

            var mockAccountService = new Mock<IAccountService>();
            mockAccountService
                .Setup(s => s.CreateAccountAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(resultingAccountModel);

            var accountController = new AccountController(mockAccountService.Object);

            var result = await accountController.CreateAccountAsync(createAccountTempModel);

            var okResponse = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Account created successfully.", okResponse.Value);
        }
    }
}