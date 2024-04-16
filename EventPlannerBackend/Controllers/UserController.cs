using EventPlanner.Models;
using EventPlanner.Server.Dtos;
using EventPlanner.Server.Services.UserService;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EventPlanner.Controllers;

[ApiController]
[Route("/api/users")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
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
        var userItem = await _userService.GetUserByIdAsync(id);
        if (userItem == null)
        {
            return NotFound();
        }

        return Ok(userItem);
    }

    [HttpPost("signup")]
    public async Task<IActionResult> SignUp([FromBody] SignUpDto newUser)
    {
        var userToCreate = await _userService.CreateUserAsync(newUser);
        return Ok(userToCreate);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto userLogin)
    {
        var user = await _userService.AuthenticateUserAsync(userLogin.Email, userLogin.Password);
        if (user == null)
        {
            return Unauthorized();
        }

        return Ok(user);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var userToDelete = await _userService.GetUserByIdAsync(id);
        if (userToDelete == null)
        {
            return NotFound();
        }

        await _userService.DeleteUserAsync(userToDelete.Id);
        return NoContent();
    }
}
