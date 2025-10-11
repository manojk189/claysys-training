


using System;

namespace DelegateMathOperations
{
    public delegate int MathOperation(int a,int b);
    class program
    {
        static int Add(int a, int b) => a + b;
        static int Subtract(int a, int b) => a - b;
        static int Multipl(int a, int b) => a * b;
        static int Divide(int a, int b)
        {
            if (b == 0)
            {
                Console.WriteLine("Error:Division by Zero");
                return 0;
            }
            return a / b;

        }
        static void Main(string[] args)
        {
            MathOperation operation;
            operation = Add;
            Console.WriteLine($"Addition: 10+5 = {operation(10,5)}");

            operation = Subtract;
            Console.WriteLine($"Subtractio: 20-6 = {operation(20,6)}");

            operation = Multipl;
            Console.WriteLine($"Multipe: 5*4 = {operation(5,4)}");

            operation = Divide;
            Console.WriteLine($"Divide: 150/4 = {operation(150,4)}");
        }
    }
}