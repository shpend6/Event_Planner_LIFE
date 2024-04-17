using EventPlanner.Database;
using EventPlanner.Models;
using EventPlannerBackend.Dtos;
using Microsoft.EntityFrameworkCore;

namespace EventPlanner.Server.Services.EventService;

public class EventService : IEventService
{
    private readonly EventPlannerDbContext _dbContext;

    public EventService(EventPlannerDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Event>> GetAllEventsAsync()
    {
        return await _dbContext.Events.ToListAsync();
    }

    public async Task<Event> GetEventByIdAsync(int id)
    {
        return await _dbContext.Events.FindAsync(id);
    }

    public async Task<Event> CreateEventAsync(Event newEvent)
    {
        // Check if any existing event is scheduled at the same time
        bool existingEvent = await _dbContext.Events.AnyAsync(e => e.ScheduledTime == newEvent.ScheduledTime);

        if (existingEvent)
        {
            throw new Exception("An event is already scheduled for this time.");
        }

        _dbContext.Events.Add(newEvent);
        await _dbContext.SaveChangesAsync();

        return newEvent;
    }

    public async Task UpdateEventAsync(int id, Event updatedEvent)
    {
        var eventToUpdate = await _dbContext.Events.FindAsync(id);
        if (eventToUpdate != null)
        {
            // Check if another event (except for this one) is scheduled at the same time
            bool conflictExists = await _dbContext.Events.AnyAsync(e => e.Id != id 
                && e.ScheduledTime == updatedEvent.ScheduledTime);

            if (conflictExists)
            {
                throw new Exception("An event is already scheduled for this time.");
            }

            eventToUpdate.Title = updatedEvent.Title;
            eventToUpdate.Description = updatedEvent.Description;
            eventToUpdate.Location = updatedEvent.Location;
            eventToUpdate.ScheduledTime = updatedEvent.ScheduledTime;
            eventToUpdate.MaxCapacity = updatedEvent.MaxCapacity;

            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task DeleteEventAsync(int id)
    {
        var eventToDelete = await _dbContext.Events.FindAsync(id);

        if (eventToDelete != null)
        {
            _dbContext.Events.Remove(eventToDelete);
            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task<List<AttendeeDto>> GetAttendeesByEventIdAsync(int id)
    {
        return await _dbContext.Attendees
            .Where(a => a.EventId == id)
            .Select(a => new AttendeeDto
            {
                UserId = a.UserId,
                FirstName = a.User.FirstName,
                LastName = a.User.LastName,
                Email = a.User.Email,
                JoinedAt = a.JoinedAt
            })
            .ToListAsync();
    }
}
