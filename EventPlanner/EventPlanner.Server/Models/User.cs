using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPlanner.Models;

[Table("Users")]
public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string PasswordHash { get; set; } // We should store only the hash (have to check how to hash passwords)

    // Navigation properties
    public ICollection<Event> CreatedEvents { get; set; } // Collection of all events this user has created
    public ICollection<Attendee> EventsAttending { get; set; } // Collection of all events this user has joined (will attend)
}
