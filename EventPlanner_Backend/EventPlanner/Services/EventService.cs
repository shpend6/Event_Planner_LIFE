using EventPlanner.Database;
using EventPlanner.Models;
using Microsoft.EntityFrameworkCore;

namespace EventPlanner.Services;

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
        _dbContext.Events.Add(newEvent);
        await _dbContext.SaveChangesAsync();
        return newEvent;
    }

    public async Task UpdateEventAsync(int id, Event updatedEvent)
    {
        var eventToUpdate = await _dbContext.Events.FindAsync(id);
        if (eventToUpdate != null)
        {
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
}
