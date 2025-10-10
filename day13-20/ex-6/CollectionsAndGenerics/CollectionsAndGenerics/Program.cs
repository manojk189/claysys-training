using System;
using System.Collections.Generic;

public class Stack<T>
{
    private List<T> elements = new List<T>();

    public void Push(T item)
    {
        elements.Add(item);
    }
    public T Pop()
    {
        if (elements.Count == 0)
            throw new InvalidOperationException("Stack is empty.");

        T item = elements[elements.Count - 1];
        elements.RemoveAt(elements.Count - 1);
        return item;
    }
    public T Peek()
    {
        if (elements.Count == 0)
            throw new InvalidOperationException("Stack is empty.");

        return elements[elements.Count - 1];
    }
    public void Display()
    {
        Console.WriteLine("Stack contents:");
        for (int i = elements.Count - 1; i >= 0; i--)
        {
            Console.WriteLine(elements[i]);
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== Stack Test with Integers ===");
        Stack<int> intStack = new Stack<int>();
        intStack.Push(10);
        intStack.Push(20);
        intStack.Push(30);
        intStack.Display();
        Console.WriteLine($"Peek: {intStack.Peek()}");
        Console.WriteLine($"Pop: {intStack.Pop()}");
        intStack.Display();

        Console.WriteLine("\n=== Stack Test with Student Names ===");
        Stack<string> nameStack = new Stack<string>();
        nameStack.Push("Raju");
        nameStack.Push("Priya");
        nameStack.Push("Arun");
        nameStack.Display();
        Console.WriteLine($"Peek: {nameStack.Peek()}");
        Console.WriteLine($"Pop: {nameStack.Pop()}");
        nameStack.Display();
    }
}

