using EventPlanner.Models;
using EventPlannerBackend.Dtos;

namespace EventPlanner.Server.Services.EventService;

public interface IEventService
{
    Task<IEnumerable<GetEventsSummaryDto>> GetEventsSummaryAsync();
    Task<IEnumerable<Event>> GetAllEventsAsync();
    Task<Event> GetEventByIdAsync(int id);
    Task<GetEventsByCategoryDto> GetEventsByCategoryAsync(string categoryName);
    Task<IEnumerable<GetEventsSummaryDto>> GetEventsByStateAsync(string state);
    Task<List<Event>> SearchEventsAsync(string query);
    Task<Event> CreateEventAsync(Event newEvent);
    Task UpdateEventAsync(int id, UpdateEventDto updatedEvent);
    Task DeleteEventAsync(int id);
    Task<List<GetAttendeeDto>> GetAttendeesByEventIdAsync(int id);
    Task<string> SaveImageAsync(IFormFile imageFile);
}
