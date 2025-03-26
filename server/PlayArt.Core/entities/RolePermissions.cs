using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.entities
{
   public class RolePermissions
    {
        public int RoleId { get; set; } // מפתח זר ל-Roles
        [ForeignKey(nameof(RoleId))]
        public Roles Roles { get; set; }
        public int PermissionId { get; set; }
        [ForeignKey(nameof(PermissionId))]
        public Permissions Permission { get; set; }

        // קשרי גומלין
        public Roles Role { get; set; }

    }
}
