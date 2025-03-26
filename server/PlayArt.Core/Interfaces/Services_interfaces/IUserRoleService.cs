using PlayArt.Core.entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.Interfaces.Services_interfaces
{
   public interface IUserRoleService
    {
        public Task<UserRoles> AddAsync(string role, int userId);

    }
}
