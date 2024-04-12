using EventPlanner.Database;
using EventPlanner.Dtos;
using EventPlanner.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventPlanner.Controllers;

[ApiController]
[Route("/api/users")]
public class UserController : ControllerBase
{
    // After EventService is implemented, remove the context and inject the service instead
    private readonly EventPlannerDbContext _context;

    public UserController(EventPlannerDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllEvents()
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }

    [HttpPost]
    public async Task<IActionResult> CreateEvent([FromBody] UserDto newUser)
    {
        var userToCreate = new User
        {
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            Email = newUser.Email, 
            PasswordHash = newUser.Password
        };

        _context.Users.Add(userToCreate);
        await _context.SaveChangesAsync();

        return Ok(userToCreate);
    }
}
