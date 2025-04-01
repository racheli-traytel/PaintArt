using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PlayArt.Core.DTOs;
using PlayArt.Core.entities;
using PlayArt.Core.Entities;
using PlayArt.Core.Interfaces;
using PlayArt.Core.Interfaces.IRepositories;

namespace PlayArt.Data.Repository
{
    public class DrawingRepository : IDrawingRepository
    {
        private readonly DataContext _context;
        public DrawingRepository(DataContext context)
        {
            _context = context;
        }

        public List<Drawing> GetAllData()
        {
            return _context.Drawings.Include(d => d.User).ToList();
        }

        public async Task<Drawing> AddAsync(Drawing drawing)
        {
            try
            {
                _context.Drawings.Add(drawing);
                return drawing;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding drawing: {ex.Message}");
                return null;
            }
        }

        public Drawing GetById(int id)
        {
            return _context.Drawings.Include(d => d.User).FirstOrDefault(d => d.Id == id);
        }

        public int GetIndexById(int id)
        {
            return _context.Drawings.ToList().FindIndex(d => d.Id == id);
        }

        public async Task<Drawing> UpdateAsync(Drawing drawing, int index)
        {
            try
            {
                var existing = GetById(index);
                if (existing == null)
                    return null;
                existing.Title = drawing.Title;
                existing.Description = drawing.Description;
                existing.Category = drawing.Category;
                existing.ImageUrl = drawing.ImageUrl;
                existing.UserId = drawing.UserId;
                existing.IsGeneratedByAI = drawing.IsGeneratedByAI;
                existing.CreatedAt = drawing.CreatedAt;

                return drawing;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating drawing: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var drawing = GetById(id);
                if (drawing == null)
                    return false;

                _context.Drawings.Remove(drawing);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting drawing: {ex.Message}");
                return false;
            }
        }

        public List<Drawing> GetDrawingCategory(DrawingCategory? category = null)
        {
            if (category == null)
            {
                return _context.Drawings.Include(d => d.User).ToList(); // אם לא נבחרה קטגוריה, מחזיר את כל דפי העבודה
            }

            return _context.Drawings.Include(d => d.User)
                                   .Where(d => d.Category == category)
                                   .ToList(); // אם נבחרה קטגוריה, מחזיר רק את דפי העבודה בקטגוריה זו
        }
        public List<Drawing> SearchDrawings(string searchTerm)
        {
            return _context.Drawings
                           .Include(d => d.User)   // כאן אנחנו כוללים את ה-User
                           .Where(d => d.Title.Contains(searchTerm) || d.Description.Contains(searchTerm))
                           .ToList();
        }


        public List<Drawing> GetTopRatedDrawings(int count = 10)
        {
            return _context.Drawings
                .OrderByDescending(d => d.AvgRating)
                .Take(count)
                .ToList();
        }

        public async Task<List<Drawing>> GetTopRatedDrawingsByUserAsync(int userId, int count = 10)
        {
            return await _context.Drawings
                .Where(d => d.UserId == userId)
                .OrderByDescending(d => d.AvgRating)
                .Take(count)
                .ToListAsync();
        }

        public List<Drawing> GetDrawingsByUserId(int userId)
        {
            return _context.Drawings.Include(d => d.User)
                                    .Where(d => d.UserId == userId)
                                    .ToList();
        }
    }
}
