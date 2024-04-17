using EventPlanner.Models;
using EventPlannerBackend.Dtos;

namespace EventPlanner.Server.Services.EventService;

public interface IEventService
{
    Task<IEnumerable<Event>> GetAllEventsAsync();
    Task<Event> GetEventByIdAsync(int id);
    Task<Event> CreateEventAsync(Event newEvent);
    Task UpdateEventAsync(int id, Event updatedEvent);
    Task DeleteEventAsync(int id);
    Task<List<AttendeeDto>> GetAttendeesByEventIdAsync(int id);
}
