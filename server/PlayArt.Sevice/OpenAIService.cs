using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace YourNamespace.Services
{
    public class DalleService
    {
        private readonly HttpClient _httpClient;
        string openAiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");


        // אתחול של HttpClient והוספת Authorization Header עם המפתח
        public DalleService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {openAiKey}");
        }

        // פעולה ליצירת תמונה מ־prompt שנשלח
        public async Task<string> GenerateImageAsync(string prompt)
        {
            if (string.IsNullOrWhiteSpace(prompt))
                prompt = "a simple colorful cartoon of a smiling sun";

            // יצירת גוף הבקשה
            var requestBody = new
            {
                prompt = prompt,
                n = 1,
                size = "512x512"
            };

            var json = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            // שליחה ל־API של OpenAI
            var response = await _httpClient.PostAsync("https://api.openai.com/v1/images/generations", content);
            var responseBody = await response.Content.ReadAsStringAsync();

            // אם לא התקבלה תשובה תקינה
            if (!response.IsSuccessStatusCode)
            {
                return $"שגיאה: {response.StatusCode} - {responseBody}";
            }

            // פענוח התשובה
            using var doc = JsonDocument.Parse(responseBody);
            return doc.RootElement.GetProperty("data")[0].GetProperty("url").GetString() ?? "לא נמצא קישור לתמונה";
        }
    }
}
