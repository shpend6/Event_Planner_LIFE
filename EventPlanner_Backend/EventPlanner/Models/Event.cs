using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPlanner.Models;

[Table("Events")]
public class Event
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; } // Needed to indicate the creator of the Event

    [Required]
    public string Title { get; set; }

    [StringLength(500)]
    public string Description { get; set; }

    [Required]
    public string Location { get; set; }

    [Required]
    public DateTime ScheduledTime { get; set; }

    public int MaxCapacity { get; set; }

    // Navigation properties
    public User User { get; set; }
    public ICollection<Attendee> Attendees { get; set; } // Collection of all the users that joined (will attend) the event
}
