using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ImageController : ControllerBase
{
    private readonly OpenAIService _openAIService;

    public ImageController()
    {
        _openAIService = new OpenAIService();
    }

    [HttpPost("generate")]
    public async Task<IActionResult> GenerateImage([FromBody] ImageRequest request)
    {
        try
        {
            var result = await _openAIService.GenerateImageAsync(request.Prompt);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

public class ImageRequest
{
    public string Prompt { get; set; }
}
