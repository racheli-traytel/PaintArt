using PlayArt.Core.entities;
using PlayArt.Core.Interfaces;
using PlayArt.Core.Interfaces.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public List<User> GetAllData()
        {
            return _context.Users.ToList();
        }

        public async Task<User> AddAsync(User user)
        {
            try
            {
                _context.Users.Add(user);

                return user;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding user: {ex.Message}");
                return null;
            }
        }

        public User GetById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public User GetByUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        public int GetIndexById(int id)
        {
            return _context.Users.ToList().FindIndex(u => u.Id == id);
        }

        public async Task<User> UpdateAsync(User user, int id)
        {
            try
            {
                var existingUser =GetById(id);
                if (existingUser == null)
                    return null;
                existingUser.FirstName = user.FirstName;
                existingUser.LastName = user.LastName;
                existingUser.Email = user.Email;
                existingUser.Password = user.Password;
                existingUser.UpdatedAt = user.UpdatedAt;
                existingUser.UpdateBy = user.UpdateBy;
                return user;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating user: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var user = GetById(id);
                if (user == null)
                    return false;

                _context.Users.Remove(user);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting user: {ex.Message}");
                return false;
            }
        }
    }

}

