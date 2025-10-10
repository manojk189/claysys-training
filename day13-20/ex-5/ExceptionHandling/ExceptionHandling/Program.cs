
using System;

class DivisionApp
{
    // Method to perform division
    static double Divide(int numerator, int denominator)
    {
        try
        {
            return (double)numerator / denominator;
        }
        catch (DivideByZeroException)
        {
            Console.WriteLine("Error: Cannot divide by zero.");
            return double.NaN; // Not a Number
        }
    }

    static void Main(string[] args)
    {
        Console.WriteLine("=== Division Operation ===");

        try
        {
            Console.Write("Enter numerator (integer): ");
            int num = int.Parse(Console.ReadLine());

            Console.Write("Enter denominator (integer): ");
            int den = int.Parse(Console.ReadLine());

            double result = Divide(num, den);

            if (!double.IsNaN(result))
            {
                Console.WriteLine($"Result: {num} / {den} = {result}");
            }
        }
        catch (FormatException)
        {
            Console.WriteLine("Error: Please enter valid integer values.");
        }

        Console.WriteLine("Program ended.");
    }
}
