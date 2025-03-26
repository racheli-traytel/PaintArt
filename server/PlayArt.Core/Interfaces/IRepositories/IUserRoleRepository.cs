using PlayArt.Core.entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.Interfaces.IRepositories
{
   public interface IUserRoleRepository
    {
        Task<UserRoles> AddAsync(UserRoles userRole);
        Task DeleteAsync(int id);
        IEnumerable<UserRoles> GetAll();
        UserRoles GetByUserId(int id);
        public UserRoles GetById(int id);
        Task<bool> UpdateAsync(int id, UserRoles userRole);
    }
}
