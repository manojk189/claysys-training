public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }

    public void DisplayProduct()
    {
        Console.WriteLine($"ID: {Id}, Name: {Name}, Price: ₹{Price}, Quantity: {Quantity}");
    }
}
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
        Console.WriteLine("\n--- Shopping Cart ---\n");
        if (cartItems.Count == 0)
        {
            Console.WriteLine("Cart is empty.");
            return;
        }

        foreach (var item in cartItems)
        {
            item.DisplayProduct();
        }
    }

    public decimal CalculateTotal()
    {
        return cartItems.Sum(p => p.Price);
    }
}
class Program
{
    static List<Product> products = new List<Product>
    {
        new Product { Id = 1, Name = "Laptop", Price = 50000, Quantity = 10 },
        new Product { Id = 2, Name = "Smartphone", Price = 20000, Quantity = 15 },
        new Product { Id = 3, Name = "Headphones", Price = 1500, Quantity = 30 },
        new Product { Id = 4, Name = "TV", Price = 4500, Quantity = 20}
    };

    static void Main(string[] args)
    {
        ShoppingCart cart = new ShoppingCart();
        bool running = true;

        while (running)
        {
            Console.WriteLine("\n--- E-Commerce Menu ---");
            Console.WriteLine("1. View Products");
            Console.WriteLine("2. Add to Cart");
            Console.WriteLine("3. View Cart");
            Console.WriteLine("4. Remove from Cart");
            Console.WriteLine("5. Checkout");
            Console.WriteLine("6. Exit");
            Console.Write("Choose an option: ");

            try
            {
                int choice = int.Parse(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        Console.WriteLine("\n--- Available Products ---");
                        foreach (var product in products)
                        {
                            product.DisplayProduct();
                        }
                        break;

                    case 2:
                        Console.Write("Enter Product ID to add: ");
                        int addId = int.Parse(Console.ReadLine());
                        var prodToAdd = products.FirstOrDefault(p => p.Id == addId);
                        if (prodToAdd != null)
                        {
                            cart.AddProduct(prodToAdd);
                        }
                        else
                        {
                            Console.WriteLine("Invalid Product ID.");
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
                        Console.WriteLine("Invalid option. Try again.");
                        break;
                }
            }
            catch (FormatException)
            {
                Console.WriteLine("Please enter a valid number.");
            }
        }
    }
}

