using PlayArt.Core.DTOs;
using PlayArt.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlayArt.Core.Interfaces.Services_interfaces
{
    public interface IUserService
    {
        IEnumerable<UserDTO> GetList();
        UserDTO GetById(int id);
        Task<UserDTO> AddUserAsync(UserDTO user, string password);
        Task<UserDTO> UpdateAsync(int id, UserDTO user); // אסינכרוני
        Task<bool> RemoveAsync(int id); // אסינכרוני
        UserDTO GetUserByEmail(string email);
        public string Authenticate(string email, string password);
        public List<UserGrowthDTO> GetUserGrowthByMonth();

    }
}
