using PlayArt.Core.entities;
using PlayArt.Core.Interfaces.IRepositories;
using PlayArt.Core.Interfaces.Services_interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Sevice
{
   public class UserRoleService:IUserRoleService
    {
        private readonly IUserRoleRepository _userRolesRepository;
        private readonly IRoleRepository _roleRpository;
        IRepositoryManager _repositoryManager;
        public UserRoleService(IUserRoleRepository userRolesRepository, IRoleRepository roleRpository, IRepositoryManager repositoryManager)
        {
            _userRolesRepository = userRolesRepository;
            _roleRpository = roleRpository;
            _repositoryManager = repositoryManager;
        }
        public async Task<UserRoles> AddAsync(string role, int userId)
        {
            int r = _roleRpository.GetIdByRole(role);
            if (r < 0)
                return null;
            UserRoles u = await _userRolesRepository.AddAsync(new UserRoles { RoleId = r, UserId = userId });
            await _repositoryManager.SaveAsync();
            return u;
        }
    }
}
