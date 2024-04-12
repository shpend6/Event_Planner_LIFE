using EventPlanner.Models;

namespace EventPlanner.Services;

public interface IEventService
{
    Task<IEnumerable<Event>> GetAllEventsAsync();
    Task<Event> GetEventByIdAsync(int eventId);
    Task<Event> CreateEventAsync(Event newEvent);
    Task UpdateEventAsync(int eventId, Event updatedEvent);
    Task DeleteEventAsync(int eventId);
}
