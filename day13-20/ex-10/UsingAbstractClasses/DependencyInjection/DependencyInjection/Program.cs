using System;
using System.Collections.Generic;

// Step 1: Abstract base class
public abstract class Shape
{
    public abstract double GetArea();
    public abstract double GetPerimeter();
}

// Step 2a: Rectangle class
public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }

    public override double GetArea() => Width * Height;
    public override double GetPerimeter() => 2 * (Width + Height);
}

// Step 2b: Circle class
public class Circle : Shape
{
    public double Radius { get; set; }

    public Circle(double radius)
    {
        Radius = radius;
    }

    public override double GetArea() => Math.PI * Radius * Radius;
    public override double GetPerimeter() => 2 * Math.PI * Radius;
}

// Step 2c: Triangle class (assume simple triangle with 3 sides)
public class Triangle : Shape
{
    public double SideA { get; set; }
    public double SideB { get; set; }
    public double SideC { get; set; }

    public Triangle(double a, double b, double c)
    {
        SideA = a;
        SideB = b;
        SideC = c;
    }

    public override double GetPerimeter() => SideA + SideB + SideC;

    public override double GetArea()
    {
        double s = GetPerimeter() / 2;
        return Math.Sqrt(s * (s - SideA) * (s - SideB) * (s - SideC)); // Heron's formula
    }
}

// Step 3: Main program
class Program
{
    static void Main(string[] args)
    {
        List<Shape> shapes = new List<Shape>
        {
            new Rectangle(10, 5),
            new Circle(7),
            new Triangle(3, 4, 5),
            new Rectangle(6, 2),
            new Circle(3.5)
        };

        double totalArea = 0;
        double totalPerimeter = 0;

        foreach (var shape in shapes)
        {
            totalArea += shape.GetArea();
            totalPerimeter += shape.GetPerimeter();
        }

        Console.WriteLine($"Total Area of all shapes: {totalArea:F2}");
        Console.WriteLine($"Total Perimeter of all shapes: {totalPerimeter:F2}");
    }
}

