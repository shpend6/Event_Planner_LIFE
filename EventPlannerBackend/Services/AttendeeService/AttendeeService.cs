using EventPlanner.Database;
using EventPlanner.Models;
using Microsoft.EntityFrameworkCore;

namespace EventPlannerBackend.Services.AttendeeService;

public class AttendeeService : IAttendeeService
{
    private readonly EventPlannerDbContext _dbContext;

    public AttendeeService(EventPlannerDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<bool> JoinEventAsync(int userId, int eventId)
    {
        var existingEvent = await _dbContext.Events.FindAsync(eventId);

        // Check if the event exists before joining
        if (existingEvent == null)
            throw new KeyNotFoundException("Event not found.");

        // Check if the user trying to join is the creator of the event (they shouldn't be shown as attendees)
        if (existingEvent.UserId == userId)
            throw new InvalidOperationException("Cannot join your own event.");

        bool isAlreadyAttending = await _dbContext.Attendees
            .AnyAsync(a => a.UserId == userId && a.EventId == eventId);

        if (isAlreadyAttending)
            throw new InvalidOperationException("Already attending the event.");

        var newAttendee = new Attendee
        {
            UserId = userId,
            EventId = eventId,
            JoinedAt = DateTime.UtcNow
        };

        _dbContext.Attendees.Add(newAttendee);
        await _dbContext.SaveChangesAsync();

        return true;
    }

    public async Task<bool> CancelEventAttendanceAsync(int userId, int eventId)
    {
        // Check if attendee exists
        var existingAttendee = await _dbContext.Attendees
            .FirstOrDefaultAsync(a => a.UserId == userId && a.EventId == eventId);

        if (existingAttendee == null)
            throw new KeyNotFoundException("Attendance record not found.");

        _dbContext.Attendees.Remove(existingAttendee);
        await _dbContext.SaveChangesAsync();

        return true;
    }
}
