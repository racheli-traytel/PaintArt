using Microsoft.EntityFrameworkCore;
using PlayArt.Core.Interfaces;
using PlayArt.Core.Interfaces.IRepositories;
using PlayArt.Core.Interfaces.Services_interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Data.Repositories
{
  public  class RepositoryManager:IRepositoryManager
    {
        private readonly DataContext dataContext ;
        public IUserRepository _userRepository { get; }
        public IDrawingRepository _drawingRepository { get; }
        public IRoleRepository _roleRepository { get; }
        public IUserRoleRepository _userRoleRepository { get; }
        public IPaintedDrawingRepository _paintedDrawingRepository { get; }
        public RepositoryManager(DataContext context, IUserRepository userRepository, IDrawingRepository drawingRepository, IRoleRepository roleRepository, IUserRoleRepository userRoleRepository, IPaintedDrawingRepository paintedDrawingRepository)
        {
            dataContext = context;
            _userRepository = userRepository;
            _drawingRepository = drawingRepository;
            _roleRepository = roleRepository;
            _userRoleRepository = userRoleRepository;
            _paintedDrawingRepository = paintedDrawingRepository;
        }
        public async Task SaveAsync()
        {
            await dataContext.SaveChangesAsync();
        }
    }
}
