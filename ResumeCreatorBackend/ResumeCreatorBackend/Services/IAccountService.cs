using ResumeCreatorBackend.Models;

namespace ResumeCreatorBackend.Services
{
    public interface IAccountService
    {
        public Task<AccountModel> CreateAccountAsync(string name, string email, string password);

        public Task<AccountModel?> GetAccountAsync(string email);

        public Task<bool> VerifyPasswordByEmailAsync(string email, string enteredPassword);

    }
}
