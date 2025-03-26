using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlayArt.Core.entities;

namespace PlayArt.Api.Controllers
{
    public class CategoryController : Controller
    {
        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            var categories = Enum.GetValues(typeof(DrawingCategory))
                                 .Cast<DrawingCategory>()
                                 .Select(c => new { Id = (int)c, Name = c.ToString() })
                                 .ToList();
            return Ok(categories);
        }
    }
}
