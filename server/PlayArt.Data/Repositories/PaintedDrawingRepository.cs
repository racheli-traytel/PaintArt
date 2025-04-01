using Microsoft.EntityFrameworkCore;
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
    public class PaintedDrawingRepository : IPaintedDrawingRepository
    {
        private readonly DataContext _context;

        public PaintedDrawingRepository(DataContext context)
        {
            _context = context;
        }

        public List<PaintedDrawing> GetAllData()
        {
            return _context.PaintedDrawings
                .Include(p => p.User)
                .Include(p => p.Drawing)
                .Where(p => !p.IsDeleted)
                .ToList();
        }

        public async Task<PaintedDrawing> AddAsync(PaintedDrawing paintedDrawing)
        {
            try
            {
                _context.PaintedDrawings.Add(paintedDrawing);
                return paintedDrawing;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding painted drawing: {ex.Message}");
                return null;
            }
        }

        public PaintedDrawing GetById(int id)
        {
            return _context.PaintedDrawings.Include(p => p.User).Include(p => p.Drawing).FirstOrDefault(p => p.Id == id);
        }

        public int GetIndexById(int id)
        {
            return _context.PaintedDrawings.ToList().FindIndex(p => p.Id == id);
        }

        public async Task<PaintedDrawing> UpdateAsync(PaintedDrawing paintedDrawing, int id)
        {
            try
            {

                var existingdrawing = GetById(id);
                if (existingdrawing == null)
                    return null;
                existingdrawing.DrawingId = paintedDrawing.DrawingId;
                existingdrawing.UserId = paintedDrawing.UserId;
                existingdrawing.imageUrl = paintedDrawing.imageUrl;
                existingdrawing.PaintedAt = paintedDrawing.PaintedAt;
                existingdrawing.Name = paintedDrawing.Name;
                return paintedDrawing;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating painted drawing: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var paintedDrawing = GetById(id);
                if (paintedDrawing == null)
                    return false;

                _context.PaintedDrawings.Remove(paintedDrawing);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting painted drawing: {ex.Message}");
                return false;
            }
        }

        public List<PaintedDrawing> GetPaintedDrawingsByUserId(int userId)
        {
            return _context.PaintedDrawings
                           .Include(p => p.User)
                           .Include(p => p.Drawing)
                           .Where(p => p.UserId == userId && !p.IsDeleted)  // סינון לפי UserId ו-IsDeleted
                           .ToList();
        }

        public List<PaintedDrawing> GetDeltedPaintedDrawingsByUserId(int userId)
        {
            return _context.PaintedDrawings
                           .Include(p => p.User)
                           .Include(p => p.Drawing)
                           .Where(p => p.UserId == userId && p.IsDeleted)  // סינון לפי UserId ו-IsDeleted
                           .ToList();
        }

    }
}

