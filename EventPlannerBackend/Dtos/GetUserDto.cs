using System.ComponentModel.DataAnnotations;

namespace EventPlannerBackend.Dtos;

public class GetUserDto
{
    public int Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string State { get; set; }

    [EmailAddress]
    public string Email { get; set; }
}
