using System;
using System.Collections.Generic;
using System.Linq;
class Program
{
    static void Main()
    {
        List<int> numbers = new List<int>{1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20};
        var evenNumbers = numbers.Where(n => n % 2 == 0).ToList();
        Console.WriteLine("evenNumbers");
        foreach (var num in evenNumbers)
        {
            Console.WriteLine(num);
        }
    }
}
