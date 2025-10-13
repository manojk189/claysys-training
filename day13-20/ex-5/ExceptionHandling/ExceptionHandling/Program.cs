using System;

namespace DivisionApp
{
    class Program
    {
        // Method to perform division with exception handling
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
            bool validInput = false;

            while (!validInput)
            {
                try
                {
                    Console.Write("Enter numerator (integer): ");
                    int num = int.Parse(Console.ReadLine());

                    Console.Write("Enter denominator (integer): ");
                    int den = int.Parse(Console.ReadLine());

                    double result = Divide(num, den);

                    if (!double.IsNaN(result))
                        Console.WriteLine($"Result: {num} / {den} = {result}");

                    validInput = true;
                }
                catch (FormatException)
                {
                    Console.WriteLine("Invalid input. Please enter valid integers.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Unexpected error: {ex.Message}");
                }
            }

            Console.WriteLine("Program finished.");
        }
    }
}

