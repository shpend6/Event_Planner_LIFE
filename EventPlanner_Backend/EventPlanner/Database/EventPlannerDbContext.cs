using Microsoft.EntityFrameworkCore;
using EventPlanner.Models;

namespace EventPlanner.Database;

public class EventPlannerDbContext : DbContext
{
    public EventPlannerDbContext(DbContextOptions<EventPlannerDbContext> options) : base(options)
    { 
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<Attendee> Attendees { get; set; }
}
