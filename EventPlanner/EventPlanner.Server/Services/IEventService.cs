using EventPlanner.Models;

namespace EventPlanner.Services;

public interface IEventService
{
    Task<IEnumerable<Event>> GetAllEventsAsync();
    Task<Event> GetEventByIdAsync(int id);
    Task<Event> CreateEventAsync(Event newEvent);
    Task UpdateEventAsync(int id, Event updatedEvent);
    Task DeleteEventAsync(int id);
}
