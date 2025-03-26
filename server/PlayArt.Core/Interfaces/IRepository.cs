using PlayArt.Core.entities;
using PlayArt.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.Interfaces
{
   public interface IRepository<T>
    {
        List<T> GetAllData();
        Task<T> AddAsync(T c);
        T GetById(int id);
        int GetIndexById(int id);
        Task<T> UpdateAsync(T c, int index);
        Task<bool> DeleteAsync(int index);
    }
}
