using EventPlanner.Database;
using EventPlanner.Server.Dtos;
using EventPlanner.Server.Services.UserService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventPlanner.Controllers;

[ApiController]
[Route("/api/users")]
public class UserController : ControllerBase
{
    private readonly EventPlannerDbContext _dbContext;
    private readonly IUserService _userService;
    private IUserService @object;

    public UserController(EventPlannerDbContext dbContext, IUserService userService)
    {
        _dbContext = dbContext;
        _userService = userService;
    }

    public UserController(IUserService @object)
    {
        this.@object = @object;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        try
        {
            var userItem = await _userService.GetUserByIdAsync(id);
            return Ok(userItem);
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(exception.Message);
        }
    }

    [HttpPost("signup")]
    public async Task<IActionResult> SignUp([FromBody] SignUpDto newUser)
    {
        try
        {
            var userToCreate = await _userService.CreateUserAsync(newUser);
            return CreatedAtAction(nameof(GetUser), new { id = userToCreate.Id }, userToCreate);
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto userLogin)
    {
        try
        {
            var userToken = await _userService.AuthenticateUserAsync(userLogin.Email, userLogin.Password);
            return Ok(userToken);
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(exception.Message);
        }
        catch (UnauthorizedAccessException exception)
        {
            return Unauthorized(exception.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            var userToDelete = await _dbContext.Users.FindAsync(id);

            await _userService.DeleteUserAsync(userToDelete.Id);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(exception.Message);
        }
    }

    [HttpGet("{id}/events-created")]
    public async Task<IActionResult> GetUserCreatedEvents(int id)
    {
        var eventsCreated = await _userService.GetUserCreatedEventsAsync(id);

        if (eventsCreated == null || !eventsCreated.Any())
            return NotFound("User has not created any events.");

        return Ok(eventsCreated);
    }

    [HttpGet("{id}/events-attending")]
    public async Task<IActionResult> GetUserAttendingEvents(int id)
    {
        var eventsAttending = await _userService.GetUserAttendingEventsAsync(id);

        if (eventsAttending == null || !eventsAttending.Any())
            return NotFound("User is not attending any events.");

        return Ok(eventsAttending);
    }
}
