using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.entities
{
    public class User
    {
        [Key]
        public int Id {get; set;}
        public string? FirstName {get; set;}
        public string? LastName {get; set;}
        public string? Email {get; set;}
        public string? Password { get; set;}
        public string? PasswordHash { get; set; }
        public DateTime CreatedAt { get; set;}
        public DateTime UpdatedAt { get; set;}
        public string? CreatedBy { get; set;}
        public string? UpdateBy { get; set;}
    }
}
