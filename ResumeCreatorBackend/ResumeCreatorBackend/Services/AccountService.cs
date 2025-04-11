using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using ResumeCreatorBackend.Controllers;
using ResumeCreatorBackend.Data;
using ResumeCreatorBackend.Models;
using System.Runtime.CompilerServices;

namespace ResumeCreatorBackend.Services
{
    public class AccountService
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<AccountModel> _passwordHasher;

        public AccountService(ApplicationDbContext context)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<AccountModel>();
        }

        public async Task<AccountModel> CreateAccountAsync(string name, string email, string password)
        {

            if(await GetAccountAsync(email) != null)
            {
                throw new InvalidOperationException("Account with the given email alredy exists.");
            }

            var account = new AccountModel
            {
                Name = name,
                Email = email
            };

            // Hash the password
            account.PasswordHash = _passwordHasher.HashPassword(account, password);

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            
            return account;
        }

        public async Task<AccountModel?> GetAccountAsync(string email)
        {
            var account = await _context.Accounts.SingleOrDefaultAsync(a => a.Email == email);
            
            // If any detailed implementation for default value would be needed
            if (account == null)
            {
                return null;
            }

            return account;
        }

        protected bool VerifyPassword(AccountModel account, string enteredPassword)
        {
            var result = _passwordHasher.VerifyHashedPassword(account, account.PasswordHash, enteredPassword);

            return result == PasswordVerificationResult.Success;
        }

        public async Task<bool> VerifyPasswordByEmailAsync(string email, string enteredPassword)
        {
            var account = await GetAccountAsync(email);

            if (account == null)
            {
                throw new KeyNotFoundException($"No user found with email: {email}");
            }

            return VerifyPassword(account, enteredPassword);
        }
    }
}
