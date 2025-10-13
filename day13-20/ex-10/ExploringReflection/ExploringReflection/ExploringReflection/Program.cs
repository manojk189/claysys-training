using System;
using System.Reflection;
public class ObjectSerializer
{

    public static void SerializeObject(object obj)
    {
        if (obj == null)
        {
            Console.WriteLine("Object is null");
            return;
        }
        Type type = obj.GetType();
        Console.WriteLine($"Serializing object of type: {type.Name}");

        PropertyInfo[] properties = type.GetProperties();

        foreach (var prop in properties)
        {
            object value = prop.GetValue(obj);
            Console.WriteLine($"{prop.Name} = {value}");
        }

        Console.WriteLine();
    }
}
// Sample classes to test
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}

public class Product
{
    public string Title { get; set; }
    public double Price { get; set; }
    public string Category { get; set; }
}

class Program
{
    static void Main(string[] args)
    {
        Person person = new Person { Name = "Ramu", Age = 28 };
        Product product = new Product { Title = "Laptop", Price = 75000, Category = "Electronics" };

        ObjectSerializer.SerializeObject(person);
        ObjectSerializer.SerializeObject(product);
    }
}
