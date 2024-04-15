using EventPlanner.Database;
using EventPlanner.Models;
using EventPlanner.Server.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EventPlanner.Server.Services.UserService;

public class UserService : IUserService
{
    private readonly EventPlannerDbContext _dbContext;
    private readonly PasswordHasher<User> _passwordHasher;

    public UserService(EventPlannerDbContext dbContext)
    {
        _dbContext = dbContext;
        _passwordHasher = new PasswordHasher<User>();
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _dbContext.Users.ToListAsync();
    }

    public async Task<User> GetUserByIdAsync(int id)
    {
        return await _dbContext.Users.FindAsync(id);
    }

    public async Task<User> CreateUserAsync(SignUpDto newUser)
    {
        // Check if the email already exists
        var existingUser = await _dbContext.Users.SingleOrDefaultAsync(u => u.Email == newUser.Email);

        if (existingUser != null)
        {
            throw new Exception("Email already in use.");
        }

        var userToCreate = new User
        {
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            Email = newUser.Email
        };

        // Here we hash the password, so it's not saved in plain text
        userToCreate.PasswordHash = _passwordHasher.HashPassword(userToCreate, newUser.Password);

        _dbContext.Users.Add(userToCreate);
        await _dbContext.SaveChangesAsync();

        return userToCreate;
    }

    public async Task<User> AuthenticateUserAsync(string email, string password)
    {
        var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.Email == email);
        if (user == null)
            return null;

        var checkPassword = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
        if (checkPassword == PasswordVerificationResult.Failed)
            return null;

        return user;
    }

    public async Task DeleteUserAsync(int id)
    {
        var userToDelete = await _dbContext.Users.FindAsync(id);

        if (userToDelete != null)
        {
            _dbContext.Users.Remove(userToDelete);
            await _dbContext.SaveChangesAsync();
        }
    }

    // Implement function in UserService to update user info
    // User password should be updated in a separate function (ResetPasswordAsync)
}
