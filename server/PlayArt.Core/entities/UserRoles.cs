using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.entities
{
   public class UserRoles
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; } // מפתח זר ל-Users
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
        public int RoleId { get; set; } // מפתח זר ל-Roles
        [ForeignKey(nameof(RoleId))]
        public Roles Role { get; set; }
    }
}
