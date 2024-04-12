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
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var userItem = await _context.Users.FindAsync(id);
        if (userItem == null)
        {
            return NotFound();
        }

        return Ok(userItem);
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] UserDto newUser)
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

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDto updatedUser)
    {
        var userToUpdate = await _context.Users.FindAsync(id);
        if (userToUpdate == null)
        {
            return NotFound();
        }

        userToUpdate.FirstName = updatedUser.FirstName;
        userToUpdate.LastName = updatedUser.LastName;
        userToUpdate.Email = updatedUser.Email;
        userToUpdate.PasswordHash = updatedUser.Password;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var userToDelete = await _context.Users.FindAsync(id);
        if (userToDelete == null)
        {
            return NotFound();
        }

        _context.Users.Remove(userToDelete);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
