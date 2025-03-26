using Microsoft.EntityFrameworkCore;
using PlayArt.Core.entities;
using PlayArt.Core.Interfaces.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Data.Repositories
{
   public class RoleRepository:IRoleRepository
    {
       private readonly DataContext _dataContext;
        public RoleRepository(DataContext context)
        {
            _dataContext = context;
        }

        public async Task<Roles> AddAsync(Roles role)
        {
            await _dataContext.AddAsync(role);
            role.CreatedAt = DateTime.UtcNow;

            return role;
        }

        public async Task DeleteAsync(int id)
        {
            var role = GetRoleById(id);
            _dataContext.Roles.Remove(role);
        }

        public IEnumerable<Roles> GetAll()
        {
            return  _dataContext.Roles.ToList();
        }

        public Roles GetRoleById(int id)
        {
            return  _dataContext.Roles.Find(id);
        }

 
        public  int GetIdByRole(string role)
        {
            var r =  _dataContext.Roles.FirstOrDefault(r => r.RoleName == role);
            if(r!=null)
              return r.Id;
            return -1;
        }

        public async Task<bool> UpdateAsync(int id, Roles role)
        {
            Roles existingRole =GetRoleById(id);
            if (existingRole != null)
            {
                existingRole.RoleName = role.RoleName;
                existingRole.Description = role.Description;
                existingRole.UpdatedAt = DateTime.UtcNow;
                return true;
            }
            return false;
        }
    }
}
