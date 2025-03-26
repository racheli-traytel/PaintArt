using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.Interfaces.IRepositories
{
  public interface IRepositoryManager
    {
        public IUserRepository _userRepository { get; }
        public IDrawingRepository _drawingRepository { get;}
        public IRoleRepository _roleRepository { get;}
        public IUserRoleRepository _userRoleRepository { get; }
        public IPaintedDrawingRepository _paintedDrawingRepository { get; }
        public Task SaveAsync();
    }
}
