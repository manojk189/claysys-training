
using System;
using System.IO;

// Step 1: Define the ILogger interface
public interface ILogger
{
    void LogInfo(string message);
    void LogWarning(string message);
    void LogError(string message);
}

// Step 2a: ConsoleLogger implementation
public class ConsoleLogger : ILogger
{
    public void LogInfo(string message) => Console.WriteLine($"[INFO] {message}");
    public void LogWarning(string message) => Console.WriteLine($"[WARNING] {message}");
    public void LogError(string message) => Console.WriteLine($"[ERROR] {message}");
}

// Step 2b: FileLogger implementation
public class FileLogger : ILogger
{
    private readonly string filePath;

    public FileLogger(string path)
    {
        filePath = path;
    }

    private void WriteToFile(string level, string message)
    {
        File.AppendAllText(filePath, $"[{level}] {message}{Environment.NewLine}");
    }

    public void LogInfo(string message) => WriteToFile("INFO", message);
    public void LogWarning(string message) => WriteToFile("WARNING", message);
    public void LogError(string message) => WriteToFile("ERROR", message);
}

// Step 3: Application class using dependency injection
public class Application
{
    private readonly ILogger _logger;

    public Application(ILogger logger)
    {
        _logger = logger;
    }

    public void Run()
    {
        _logger.LogInfo("Application started.");
        _logger.LogWarning("Low disk space.");
        _logger.LogError("Unhandled exception occurred.");
    }
}

// Main program
class Program
{
    static void Main(string[] args)
    {
        // Switch between loggers here
        ILogger logger;

        Console.WriteLine("Choose logger type: 1 for Console, 2 for File");
        string choice = Console.ReadLine();

        if (choice == "2")
        {
            logger = new FileLogger("log.txt");
        }
        else
        {
            logger = new ConsoleLogger();
        }

        Application app = new Application(logger);
        app.Run();

        Console.WriteLine("Logging complete.");
    }
}
