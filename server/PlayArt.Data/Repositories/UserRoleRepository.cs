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
    public class UserRoleRepository : IUserRoleRepository
    {
        protected readonly DataContext _dataContext;

        public UserRoleRepository(DataContext context)
        {
            _dataContext = context;
        }

        public async Task<UserRoles> AddAsync(UserRoles userRole)
        {
            await _dataContext.UserRoles.AddAsync(userRole);
            return userRole;
        }

        public async Task DeleteAsync(int id)
        {
            var userRole =  GetById(id);
            _dataContext.UserRoles.Remove(userRole);
        }

        public IEnumerable<UserRoles> GetAll()
        {
            return  _dataContext.UserRoles.Include(ur => ur.User).Include(ur => ur.Role).ToList();
        }

        public  UserRoles GetByUserId(int id)
        {
            return  _dataContext.UserRoles.Include(ur => ur.User).Include(ur => ur.Role).FirstOrDefault(ur => ur.UserId == id);
        }
        public UserRoles GetById(int id)
        {
            return  _dataContext.UserRoles.Include(ur => ur.User).Include(ur => ur.Role).FirstOrDefault(ur => ur.Id == id);
        }
        public  async Task<bool> UpdateAsync(int id, UserRoles userRole)
        {
            UserRoles existingUserRole = GetById(id);
            if (existingUserRole != null)
            {
                existingUserRole.UserId = userRole.UserId;
                existingUserRole.RoleId = userRole.RoleId;

                return true;
            }
            return false;
        }
    }
}
