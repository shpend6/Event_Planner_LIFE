using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPlanner.Models;

// This class serves as a join table (many-to-many between User and Event), that keeps track of which user joined (will attend) which event
[Table("Attendees")]
public class Attendee
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    public int EventId { get; set; }

    [Required]
    public DateTime JoinedAt { get; set; }

    // Navigation properties
    public User User { get; set; }
    public Event Event { get; set; }
}
