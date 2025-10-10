// Generate random number between 1,100
Random random= new Random();
int target = random.Next(1, 100);
Console.WriteLine("enter your guess:(between 1 and 100 )");
int userguess = Convert.ToInt32(Console.ReadLine());

while (userguess != target) 
{

    if (userguess < target) 
    {
        Console.WriteLine("too low ! try again");
        
    }
    else if (userguess > target) 
    {
        Console.WriteLine("too High ! try again");
        
    }
    Console.WriteLine("enter your guess:");
    userguess = Convert.ToInt32(Console.ReadLine());

}
Console.WriteLine("You Guessed a correct number");

