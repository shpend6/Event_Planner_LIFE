using EventPlanner.Database;
using EventPlanner.Models;
using EventPlannerBackend.Models.Enums;
using Microsoft.AspNetCore.Identity;

namespace EventPlannerBackend.Database;

public static class AddAdminInitializer
{
    public static void CreateAdminUser(EventPlannerDbContext dbContext, PasswordHasher<User> passwordHasher)
    {
        // Check if the admin user already exists
        if (dbContext.Users.Any(u => u.Email == "admin@eventplanner.com"))
        {
            Console.WriteLine("Admin user already exists.");
            return;
        }

        var adminUser = new User
        {
            Role = UserRole.Admin,
            Email = "admin@eventplanner.com",
            FirstName = "Admin",
            LastName = "EventPlanner",
            State = "Kosova"
        };

        adminUser.PasswordHash = passwordHasher.HashPassword(adminUser, "VerySecurePassword!");

        dbContext.Users.Add(adminUser);
        dbContext.SaveChanges();
        Console.WriteLine("Admin user added successfully.");
    }
}
