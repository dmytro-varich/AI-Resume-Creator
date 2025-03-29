using Microsoft.AspNetCore.Identity;
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

        public void CreateAccount(string email, string password)
        {
            var account = new AccountModel
            {
                Email = email
            };

            // Hash the password
            account.PasswordHash = _passwordHasher.HashPassword(account, password);

            _context.Accounts.Add(account);
            _context.SaveChanges();
        }
    }
}
