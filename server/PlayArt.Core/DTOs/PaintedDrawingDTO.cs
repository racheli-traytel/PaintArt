using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.DTOs
{
    public class PaintedDrawingDTO
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public int DrawingId { get; set; }
        public int UserId { get; set; }
        public string imageUrl { get; set; }
        public DateTime PaintedAt { get; set; }
        public bool IsDeleted { get; set; }
    }
}
