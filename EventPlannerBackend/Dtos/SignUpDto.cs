using System.ComponentModel.DataAnnotations;

namespace EventPlanner.Server.Dtos;

public class SignUpDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    [EmailAddress]
    public string Email { get; set; }
    public string Password { get; set; }
}
