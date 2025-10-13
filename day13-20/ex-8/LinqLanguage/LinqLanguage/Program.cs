using System;
using System.Collections.Generic;
using System.Linq;
namespace LINQProductDemo
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
            List<Product> products = new List<Product>
            {
                new Product{Name="Laptop",Category="Electronics",Price=55000},
                new Product{Name="SmartPhone",Category="Electronics",Price=23000},
                new Product{Name="Desk",Category="Furniture",Price=12000},
                new Product{Name="Chair",Category="Furniture",Price=5000},
                new Product{Name="HeadPhones",Category="Electronics",Price=3500},
                new Product{Name="BhookShelf",Category="Furniture",Price=7000}

            };
            string targetCategory = "Electronics";
            var filteredProducts = products
                .Where(p => p.Category == targetCategory)
                .ToList();

            double averagePrice = filteredProducts.Average(p => p.Price);
            Console.WriteLine($"Product in Category '{targetCategory}'");
            foreach (var product in filteredProducts)
            {
                Console.WriteLine($"- {product.Name}: ₹{product.Price}");
                
            }
            Console.WriteLine($"\nAverage price in '{targetCategory}' category: ₹{averagePrice:F2}");

        }
            }
        
           
}

