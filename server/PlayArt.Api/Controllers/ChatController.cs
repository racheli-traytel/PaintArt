using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlayArt.Api.Controllers.YourMusicWebsite.Models;

namespace PlayArt.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatApiController : ControllerBase
    {
        //private readonly OpenAIService _openAIService;


        private readonly HttpClient client = new HttpClient();
        string openAiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");


        [HttpPost("chat")]
        public async Task<IActionResult> Chat([FromBody] ChatRequest request)
        {
            try
            {
                var prompt = new
                {
                    model = "gpt-4o-mini",
                    messages = new[] {
                new { role = "system", content = request.SystemRole ?? "אתה מומחה לציורים, עזור למשתמש, תענה רק על שאלות שקשורות לציורים ואומנות" },
                new { role = "user", content = request.Message }
            }
                };

                var httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
                {
                    Content = JsonContent.Create(prompt)
                };
                httpRequest.Headers.Add("Authorization", $"Bearer {openAiKey}");

                var response = await client.SendAsync(httpRequest);
                var content = await response.Content.ReadAsStringAsync();

                return Ok(new { response = content });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
    // Request/Response Models
    namespace YourMusicWebsite.Models
    {
        public class ChatRequest
        {
            public string Message { get; set; }
            public string SystemRole { get; set; }
        }

        public class ChatResponse
        {
            public string Message { get; set; }
        }

        public class MusicRecommendationRequest
        {
            public string Preferences { get; set; }
        }
    }
}
