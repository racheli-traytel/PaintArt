using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

public class OpenAIService
{
    private readonly HttpClient _httpClient;
    private const string OpenAIEndpoint = "https://api.openai.com/v1/images/generations";

    public OpenAIService()
    {
        _httpClient = new HttpClient();
<<<<<<< HEAD
        //_httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
=======
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
>>>>>>> 11dc749603676c2bf013f356e812585c2e4856a5
    }

    public async Task<string> GenerateImageAsync(string prompt)
    {
        var requestBody = new
        {
            model = "dall-e-3",  // שימוש ב-DALL·E 3
            prompt = prompt,
            n = 1,
            size = "1024x1024"
        };

        var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
        var response = await _httpClient.PostAsync(OpenAIEndpoint, content);

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Error: {response.StatusCode}");
        }

        var jsonResponse = await response.Content.ReadAsStringAsync();
        return jsonResponse;
    }
}
