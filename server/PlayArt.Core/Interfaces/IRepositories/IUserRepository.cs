using PlayArt.Core.entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.Interfaces.IRepositories
{
  public  interface IUserRepository:IRepository<User>
    {
        User GetByUserByEmail(string email);
    }
}
