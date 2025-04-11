using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ResumeCreatorBackend.Models
{
    public class AccountModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }
    }
}
