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
    // The methods below have to be implemented
    public Task<IEnumerable<Event>> GetAllEventsAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Event> GetEventByIdAsync(int eventId)
    {
        throw new NotImplementedException();
    }

    public Task<Event> CreateEventAsync(Event newEvent)
    {
        throw new NotImplementedException();
    }

    public Task UpdateEventAsync(int eventId, Event updatedEvent)
    {
        throw new NotImplementedException();
    }

    public Task DeleteEventAsync(int eventId)
    {
        throw new NotImplementedException();
    }
}
