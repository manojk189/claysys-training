using System;
using System.Timers;

namespace ClockEventDemo
{
    // Define delegate for the event
    public delegate void TickHandler(object sender, DateTime currentTime);


    // Main program
    class Program
    {
        static void Main(string[] args)
        {
            Clock clock = new Clock();
            Display display = new Display();// shows the time 

            display.Subscribe(clock);
            clock.Start();// timer start

            Console.WriteLine("Press Enter to exit...");-
            Console.ReadLine(); 
        }
    }

    public class Clock
    {
        private System.Timers.Timer timer;

        // Event declaration
        public event TickHandler Tick;

        public Clock()
        {
            timer = new System.Timers.Timer(1000); 
            timer.Elapsed += OnTimedEvent;
            timer.AutoReset = true;
        }

        public void Start()
        {
            timer.Start();
        }

        private void OnTimedEvent(object sender, ElapsedEventArgs e)
        {
            Tick?.Invoke(this, DateTime.Now); // Raise the event
        }
    }

    // Display class that subscribes to the Clock event
    public class Display
    {
        public void Subscribe(Clock clock)
        {
            clock.Tick += ShowTime;
        }

        private void ShowTime(object sender, DateTime currentTime)
        {
            Console.WriteLine("Current Time: " + currentTime.ToLongTimeString());
        }
    }
}
