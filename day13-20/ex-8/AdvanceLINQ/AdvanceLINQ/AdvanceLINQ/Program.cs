using System;
using System.Collections.Generic;
using System.Linq;

namespace LINQGroupOrderProject
{
    class Product
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public double Price { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // Sample product list
            List<Product> products = new List<Product>
            {
                new Product { Name = "Laptop", Category = "Electronics", Price = 75000 },
                new Product { Name = "Smartphone", Category = "Electronics", Price = 30000 },
                new Product { Name = "Headphones", Category = "Electronics", Price = 2500 },
                new Product { Name = "Desk", Category = "Furniture", Price = 12000 },
                new Product { Name = "Chair", Category = "Furniture", Price = 5000 },
                new Product { Name = "Bookshelf", Category = "Furniture", Price = 8000 },
                new Product { Name = "Pen", Category = "Stationery", Price = 50 },
                new Product { Name = "Notebook", Category = "Stationery", Price = 100 }
            };

            // LINQ query: Group by category, count products, order by count descending
            var groupedResult = products
                .GroupBy(p => p.Category)
                .Select(g => new
                {
                    Category = g.Key,
                    ProductCount = g.Count()
                })
                .OrderByDescending(g => g.ProductCount);

            // Display results
            Console.WriteLine("Product count by category (descending):");
            foreach (var group in groupedResult)
            {
                Console.WriteLine($"- {group.Category}: {group.ProductCount} products");
            }
        }
    }
}

