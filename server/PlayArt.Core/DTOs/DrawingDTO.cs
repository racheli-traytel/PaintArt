using PlayArt.Core.entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.DTOs
{
    public class DrawingDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }
        public DrawingCategory Category { get; set; }
        public string ImageUrl { get; set; }
        public int? UserId { get; set; }
        public bool IsGeneratedByAI { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CountRating { get; set; }
        public double AvgRating { get; set; }

    }
}
