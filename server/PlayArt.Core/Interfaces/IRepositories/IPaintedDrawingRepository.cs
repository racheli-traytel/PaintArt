using PlayArt.Core.entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.Interfaces.IRepositories
{
   public interface IPaintedDrawingRepository:IRepository<PaintedDrawing>
    {
        List<PaintedDrawing> GetPaintedDrawingsByUserId(int userId);
        List<PaintedDrawing> GetDeltedPaintedDrawingsByUserId(int userId);
    }
}
