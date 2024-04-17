namespace EventPlannerBackend.Dtos;

public class AttendeeDto
{
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public DateTime JoinedAt { get; set; }
}
