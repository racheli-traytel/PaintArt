using PlayArt.Core.entities;

namespace PlayArt.Api.Models
{
    public class DrawingPostModel
    {
        public string Title { get; set; } = string.Empty;
        public string Name { get; set; }
        public string Description { get; set; } = string.Empty;
        public DrawingCategory Category { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public int? UserId { get; set; }
        public bool IsGeneratedByAI { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
