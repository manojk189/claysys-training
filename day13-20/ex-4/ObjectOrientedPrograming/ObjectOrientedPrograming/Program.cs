using System;
using System.Collections.Generic;
using System.Linq;

namespace ECommerceApp
{
    // Product class
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public void DisplayProduct()
        {
            Console.WriteLine($"ID: {Id}, Name: {Name}, Price: ₹{Price}, Available: {Quantity}");
        }
    }

    // ShoppingCart class
    public class ShoppingCart
    {
        private List<Product> cartItems = new List<Product>();

        public void AddProduct(Product product)
        {
            cartItems.Add(product);
            Console.WriteLine($"{product.Name} added to cart.");
        }

        public void RemoveProduct(int productId)
        {
            var item = cartItems.FirstOrDefault(p => p.Id == productId);
            if (item != null)
            {
                cartItems.Remove(item);
                Console.WriteLine($"{item.Name} removed from cart.");
            }
            else
            {
                Console.WriteLine("Product not found in cart.");
            }
        }

        public void DisplayCart()
        {
            if (cartItems.Count == 0)
            {
                Console.WriteLine("Cart is empty.");
                return;
            }

            Console.WriteLine("\nYour Cart:");
            foreach (var item in cartItems)
            {
                Console.WriteLine($"ID: {item.Id}, Name: {item.Name}, Price: ₹{item.Price}");
            }
        }

        public decimal CalculateTotal()
        {
            return cartItems.Sum(p => p.Price);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            List<Product> products = new List<Product>
            {
                new Product { Id = 1, Name = "Laptop", Price = 55000, Quantity = 10 },
                new Product { Id = 2, Name = "Smartphone", Price = 25000, Quantity = 15 },
                new Product { Id = 3, Name = "Headphones", Price = 1500, Quantity = 30 }
            };

            ShoppingCart cart = new ShoppingCart();
            bool running = true;

            while (running)
            {
                Console.WriteLine("\n--- E-Commerce Menu ---");
                Console.WriteLine("1. View Products");
                Console.WriteLine("2. Add Product to Cart");
                Console.WriteLine("3. View Cart");
                Console.WriteLine("4. Remove Product from Cart");
                Console.WriteLine("5. Checkout");
                Console.WriteLine("6. Exit");
                Console.Write("Enter your choice: ");

                try
                {
                    int choice = int.Parse(Console.ReadLine());

                    switch (choice)
                    {
                        case 1:
                            Console.WriteLine("\nAvailable Products:");
                            foreach (var product in products)
                                product.DisplayProduct();
                            break;

                        case 2:
                            Console.Write("Enter Product ID to add: ");
                            int addId = int.Parse(Console.ReadLine());
                            var prodToAdd = products.FirstOrDefault(p => p.Id == addId);
                            if (prodToAdd != null && prodToAdd.Quantity > 0)
                            {
                                cart.AddProduct(prodToAdd);
                                prodToAdd.Quantity--;
                            }
                            else
                            {
                                Console.WriteLine("Product not available.");
                            }
                            break;

                        case 3:
                            cart.DisplayCart();
                            break;

                        case 4:
                            Console.Write("Enter Product ID to remove: ");
                            int removeId = int.Parse(Console.ReadLine());
                            cart.RemoveProduct(removeId);
                            break;

                        case 5:
                            cart.DisplayCart();
                            Console.WriteLine($"Total Amount: ₹{cart.CalculateTotal()}");
                            Console.WriteLine("Thank you for shopping!");
                            running = false;
                            break;

                        case 6:
                            running = false;
                            break;

                        default:
                            Console.WriteLine("Invalid choice. Try again.");
                            break;
                    }
                }
                catch (FormatException)
                {
                    Console.WriteLine("Invalid input. Please enter a number.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Unexpected error: {ex.Message}");
                }
            }
        }
    }
}
