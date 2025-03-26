using PlayArt.Core.entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlayArt.Core.Entities
{
    public class Drawing
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;

        public DrawingCategory Category { get; set; }
        public string? ImageUrl { get; set; } = string.Empty;
        public string Name { get; set; }
        public int? UserId { get; set; }
        public double AvgRating { get; set; } 

        public int CountRating { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }  // קשר למשתמש

        public bool IsGeneratedByAI { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;  // הגדרת ברירת מחדל בזמן יצירה
    }
}
