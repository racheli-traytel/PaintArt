using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.DTOs
{
    public class UserStatisticsDto
    {
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public int DrawingsCount { get; set; }
        public int PaintedDrawingsCount { get; set; }
    }

    public class SystemStatisticsDto
    {
        public int TotalUsers { get; set; }
        public int TotalDrawings { get; set; }
        public int TotalPaintedDrawings { get; set; }
    }
}
