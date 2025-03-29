using Microsoft.EntityFrameworkCore;
using ResumeCreatorBackend.Models;
using System.Security.Principal;

namespace ResumeCreatorBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<AccountModel> Accounts { get; set; }
    }
}
