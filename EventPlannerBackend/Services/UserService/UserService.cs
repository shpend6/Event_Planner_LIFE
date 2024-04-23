using EventPlanner.Database;
using EventPlanner.Models;
using EventPlanner.Server.Dtos;
using EventPlannerBackend.Models.Enums;
using EventPlannerBackend.Services.TokenService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EventPlanner.Server.Services.UserService;

public class UserService : IUserService
{
    private readonly EventPlannerDbContext _dbContext;
    private readonly PasswordHasher<User> _passwordHasher;
    private readonly ITokenService _tokenService;

    public UserService(EventPlannerDbContext dbContext, ITokenService tokenService)
    {
        _dbContext = dbContext;
        _tokenService = tokenService;
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
            Role = UserRole.User,
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            State = newUser.State,
            Email = newUser.Email
        };

        // Here we hash the password, so it's not saved in plain text
        userToCreate.PasswordHash = _passwordHasher.HashPassword(userToCreate, newUser.Password);

        _dbContext.Users.Add(userToCreate);
        await _dbContext.SaveChangesAsync();

        return userToCreate;
    }

    public async Task<string> AuthenticateUserAsync(string email, string password)
    {
        var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.Email == email);
        if (user == null)
            return null;

        var checkPassword = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
        if (checkPassword == PasswordVerificationResult.Failed)
            return null;

        return _tokenService.GenerateToken(user);
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

    public async Task<List<Event>> GetUserCreatedEventsAsync(int id)
    {
        var eventsCreated = await _dbContext.Events.Where(e => e.UserId == id).ToListAsync();
        return eventsCreated;
    }

    public async Task<List<Event>> GetUserAttendingEventsAsync(int id)
    {
        var eventsAttending = await _dbContext.Attendees.Where(a => a.UserId == id).Select(a => a.Event).ToListAsync();
        return eventsAttending;
    }

    // Implement function in UserService to update user info
    // User password should be updated in a separate function (ResetPasswordAsync)
}
