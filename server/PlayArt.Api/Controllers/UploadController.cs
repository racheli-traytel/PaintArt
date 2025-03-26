using System.IO;
using Microsoft.AspNetCore.Mvc;
using Amazon.S3;
using Amazon.S3.Model;

[ApiController]
[Route("api/upload")]
public class UploadController : ControllerBase
{
    private readonly IAmazonS3 _s3Client;
    private readonly HashSet<string> _allowedExtensions = new() { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp" };

    public UploadController(IAmazonS3 s3Client)
    {
        _s3Client = s3Client;
    }

    [HttpGet("presigned-url")]
    public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
    {
        var extension = Path.GetExtension(fileName).ToLower();

        string contentType = extension switch
        {
            ".jpg" => "image/jpeg",
            ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".gif" => "image/gif",
            ".bmp" => "image/bmp",
            ".webp" => "image/webp",
            _ => "application/octet-stream",
        };

        var request = new GetPreSignedUrlRequest
        {
            BucketName = "drawing-bucket",
            Key = fileName,
            Verb = HttpVerb.PUT,
            Expires = DateTime.UtcNow.AddMinutes(5),
            ContentType = contentType
        };

        string url = _s3Client.GetPreSignedURL(request);
        return Ok(new { url });
    }


    [HttpGet("download-url/{fileName}")]
    public async Task<string> GetDownloadUrlAsync(string fileName)
    {
        var request = new GetPreSignedUrlRequest
        {
            BucketName = "drawing-bucket",
            Key = fileName,
            Verb = HttpVerb.GET,
            Expires = DateTime.UtcNow.AddDays(300),
        };

        return _s3Client.GetPreSignedURL(request);
    }
}


