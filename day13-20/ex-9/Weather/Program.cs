using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace WeatherForecastApp
{
    class Program
    {
        // Simple in-memory cache
        static Dictionary<string, dynamic> weatherCache = new Dictionary<string, dynamic>();

        static async Task Main(string[] args)
        {
            Console.WriteLine("🌍 Enter city names separated by commas:");
            string input = Console.ReadLine();
            string[] cities = input.Split(',');

            List<Task> tasks = new List<Task>();

            foreach (var city in cities)
            {
                string trimmedCity = city.Trim();
                tasks.Add(DisplayWeatherAsync(trimmedCity));
            }

            await Task.WhenAll(tasks);

            Console.WriteLine("\n✅ Weather fetch complete.");
        }

        static async Task DisplayWeatherAsync(string city)
        {
            try
            {
                dynamic weatherData;

                // Check cache first
                if (weatherCache.ContainsKey(city.ToLower()))
                {
                    weatherData = weatherCache[city.ToLower()];
                }
                else
                {
                    weatherData = await GetWeatherAsync(city);
                    if (weatherData != null)
                    {
                        weatherCache[city.ToLower()] = weatherData;
                    }
                }

                if (weatherData != null)
                {
                    string condition = weatherData.current.condition.text;
                    double temp = weatherData.current.temp_c;
                    double feelsLike = weatherData.current.feelslike_c;
                    int humidity = weatherData.current.humidity;
                    double windKph = weatherData.current.wind_kph;

                    Console.ForegroundColor = ConsoleColor.Cyan;
                    Console.WriteLine($"\n📍 Weather in {city}:");
                    Console.ResetColor();
                    Console.WriteLine($"🌡️ Temperature: {temp}°C");
                    Console.WriteLine($"🤗 Feels Like: {feelsLike}°C");
                    Console.WriteLine($"🌥️ Condition: {condition}");
                    Console.WriteLine($"💧 Humidity: {humidity}%");
                    Console.WriteLine($"🌬️ Wind Speed: {windKph} kph");
                }
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"\n❌ Error fetching weather for '{city}': {ex.Message}");
                Console.ResetColor();
            }
        }

        static async Task<dynamic> GetWeatherAsync(string city)
        {
            string apiKey = "10df6420651f411b9ca41203252909"; // Your WeatherAPI key
            string url = $"https://api.weatherapi.com/v1/current.json?key={apiKey}&q={city}";

            using HttpClient client = new HttpClient();

            try
            {
                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();

                string json = await response.Content.ReadAsStringAsync();
                dynamic weatherData = JsonConvert.DeserializeObject(json);
                return weatherData;
            }
            catch (HttpRequestException)
            {
                Console.WriteLine($"\n⚠️ Network error or invalid city: '{city}'");
                return null;
            }
        }
    }
}