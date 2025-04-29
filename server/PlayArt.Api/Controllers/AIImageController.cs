using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using YourNamespace.Services;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DalleController : ControllerBase
    {
        private readonly DalleService _dalleService;

        // הקונסטרוקטור מקבל את השירות של DalleService
        public DalleController(DalleService dalleService)
        {
            _dalleService = dalleService;
        }

        // פעולה ליצירת ציור
        [HttpPost("generate")]
        public async Task<IActionResult> Generate([FromBody] PromptDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Text))
            {
                return BadRequest(new { message = "הטקסט לא יכול להיות ריק. אנא הזיני תיאור באנגלית." });
            }

            // שליחת הבקשה ל-DalleService
            var imageUrl = await _dalleService.GenerateImageAsync(dto.Text);

            // אם יש שגיאה
            if (imageUrl.StartsWith("שגיאה"))
            {
                return StatusCode(500, new { message = imageUrl });
            }

            // אם הכל עבר בהצלחה, מחזירים את כתובת התמונה
            return Ok(new { imageUrl });
        }
    }

    // דגם עבור הנתונים שיתקבלו בבקשה (תיאור הציור)
    public class PromptDto
    {
        public string Text { get; set; }
    }
}
