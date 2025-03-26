using PlayArt.Core.entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.Interfaces.IRepositories
{
   public interface IRoleRepository
    {
        IEnumerable<Roles> GetAll();
        public Roles GetRoleById(int id);
        public int GetIdByRole(string role);
        public Task<Roles> AddAsync(Roles role);
        public Task<bool> UpdateAsync(int id, Roles role);
        Task DeleteAsync(int id);
    }
}
