namespace PlayArt.Api.Models
{
    public class PaintedDrawingPostModel
    {
        public string Name { get; set; }
        public int DrawingId { get; set; }
        public int UserId { get; set; }
        public string imageUrl { get; set; } = string.Empty;
    }
}
