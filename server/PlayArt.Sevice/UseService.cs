using AutoMapper;
using Microsoft.AspNetCore.Identity;
using PlayArt.Core.DTOs;
using PlayArt.Core.entities;
using PlayArt.Core.Entities;
using PlayArt.Core.Interfaces;
using PlayArt.Core.Interfaces.IRepositories;
using PlayArt.Core.Interfaces.Services_interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace PlayArt.Service
{

    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;
        private readonly IUserRoleRepository _userrolerepository;
        private readonly IRoleRepository _rolerepository;
        private readonly IRepositoryManager _repositoryManager;
        private readonly IPasswordHasher<User> _passwordHasher;
        public UserService(IUserRepository repository, IMapper mapper, IUserRoleRepository userrolerepository, IRoleRepository rolerepository, IRepositoryManager repositoryManager, IPasswordHasher<User> passwordHasher)
        {
            _repository = repository;
            _mapper = mapper;
            _userrolerepository = userrolerepository;
            _rolerepository = rolerepository;
            _repositoryManager = repositoryManager;
            _passwordHasher = passwordHasher;
        }

        public IEnumerable<UserDTO> GetList()
        {
            return _mapper.Map<IEnumerable<UserDTO>>(_repository.GetAllData());
        }

        public UserDTO GetById(int id)
        {
            return _mapper.Map<UserDTO>(_repository.GetById(id));
        }

        public List<UserGrowthDTO> GetUserGrowthByMonth()
        {
            var result =  GetList()
                .GroupBy(u => new { Year = u.CreatedAt.Year, Month = u.CreatedAt.Month })
                .Select(g => new UserGrowthDTO
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    UserCount = g.Count()
                })
                .OrderBy(x => x.Year)
                .ThenBy(x => x.Month)
                .ToList();

            return result;
        }
        public async Task<UserDTO> AddUserAsync(UserDTO user, string password)
        {
            // בודק אם המשתמש כבר קיים לפי ה-Id או ה-Email
            if (_repository.GetById(user.Id) == null && _repository.GetByUserByEmail(user.Email) == null)
            {
                var current = _mapper.Map<User>(user);

                current.Password = _passwordHasher.HashPassword(current, password); // Hashing הסיסמה שהתקבלה

                current.CreatedAt = DateTime.UtcNow;

                var result = await _repository.AddAsync(current);
                await _repositoryManager.SaveAsync();

                return _mapper.Map<UserDTO>(result);
            }
            return null;
        }


        public async Task<UserDTO> UpdateAsync(int id, UserDTO user)
        {
            if (id < 0)
                return null;

            var result = await _repository.UpdateAsync(_mapper.Map<User>(user), id);
            await _repositoryManager.SaveAsync();

            return _mapper.Map<UserDTO>(result);
        }

        public async Task<bool> RemoveAsync(int id)
        {
            if (id < 0) return false;
            var res= await _repository.DeleteAsync(id);
            await _repositoryManager.SaveAsync();
            return res;
        }

        public UserDTO GetUserByEmail(string email)
        {
            return _mapper.Map<UserDTO>(_repository.GetByUserByEmail(email));
        }

        public string Authenticate(string email, string password)
        {
            User user = _repository.GetByUserByEmail(email);
            if (user == null) return "האימייל לא נמצא במערכת";

            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, password);
            if (result != PasswordVerificationResult.Success)
            {
                return "סיסמא שגויה";
            }

            var userRole = _userrolerepository.GetByUserId(user.Id);
            if (userRole == null) return null;

            return userRole.Role.RoleName;
        }



    }
}
