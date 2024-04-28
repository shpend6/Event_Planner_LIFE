using EventPlanner.Database;
using EventPlanner.Models;
using EventPlanner.Server.Dtos;
using EventPlannerBackend.Dtos;
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

    public async Task<IEnumerable<GetUserDto>> GetAllUsersAsync()
    {
        return await _dbContext.Users.Select(u => new GetUserDto
        {
            Id = u.Id,
            FirstName = u.FirstName,
            LastName = u.LastName,
            State = u.State,
            Email = u.Email
        })
        .ToListAsync();
    }

    public async Task<GetUserDto> GetUserByIdAsync(int id)
    {
        var user = await _dbContext.Users.FindAsync(id);

        if (user == null)
            throw new KeyNotFoundException("User not found.");

        return new GetUserDto
        {
            Id = id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            State = user.State,
            Email = user.Email
        };
    }

    public async Task<User> CreateUserAsync(SignUpDto newUser)
    {
        // Check if the email has been already used
        var existingUser = await _dbContext.Users.SingleOrDefaultAsync(u => u.Email == newUser.Email);

        if (existingUser != null)
            throw new InvalidOperationException("Email already in use.");

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
            throw new KeyNotFoundException("Email has not been used.");

        var checkPassword = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
        if (checkPassword == PasswordVerificationResult.Failed)
            throw new UnauthorizedAccessException("Wrong password.");

        return _tokenService.GenerateToken(user);
    }

    public async Task DeleteUserAsync(int id)
    {
        var userToDelete = await _dbContext.Users.FindAsync(id);

        if (userToDelete == null)
            throw new KeyNotFoundException("User not found.");

        _dbContext.Users.Remove(userToDelete);
        await _dbContext.SaveChangesAsync();

    }

    public async Task<List<Event>> GetUserCreatedEventsAsync(int id)
    {
        var eventsCreated = await _dbContext.Events
            .Where(e => e.UserId == id)
            .ToListAsync();
        return eventsCreated;
    }

    public async Task<List<Event>> GetUserAttendingEventsAsync(int id)
    {
        var eventsAttending = await _dbContext.Attendees
            .Where(a => a.UserId == id)
            .Select(a => a.Event)
            .ToListAsync();
        return eventsAttending;
    }
}
