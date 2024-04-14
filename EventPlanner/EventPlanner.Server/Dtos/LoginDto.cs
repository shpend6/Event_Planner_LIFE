using System.ComponentModel.DataAnnotations;

namespace EventPlanner.Server.Dtos;

public class LoginDto
{
    [EmailAddress]
    public string Email { get; set; }
    public string Password { get; set; }
}
