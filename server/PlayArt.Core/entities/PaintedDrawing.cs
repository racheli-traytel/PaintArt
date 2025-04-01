using PlayArt.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.entities
{
    public class PaintedDrawing
    {
        [Key]
        public int Id { get; set; }  // מפתח ראשי
        public int DrawingId { get; set; }  // הציור המקורי שנצבע
        [ForeignKey(nameof(DrawingId))]    
        public Drawing? Drawing { get; set; }
        public bool IsDeleted { get; set; } = false;
        public int UserId { get; set; }  // המשתמש שצבע את הציור

        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }
        public string Name { get; set; }
        public string? imageUrl { get; set; } = string.Empty;  // קישור לתמונה הצבועה
        public DateTime PaintedAt { get; set; } = DateTime.UtcNow;  // תאריך הצביעה
    }
}

