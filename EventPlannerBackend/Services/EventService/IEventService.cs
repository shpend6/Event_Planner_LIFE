using EventPlanner.Models;
using EventPlannerBackend.Dtos;

namespace EventPlanner.Server.Services.EventService;

public interface IEventService
{
    Task<IEnumerable<GetEventsSummaryDto>> GetEventsSummaryAsync();
    Task<IEnumerable<Event>> GetAllEventsAsync();
    // getFutureEventASync()
    Task<Event> GetEventByIdAsync(int id);
    Task<List<Event>> SearchEventsAsync(string query);
    Task<Event> CreateEventAsync(Event newEvent);
    Task UpdateEventAsync(int id, UpdateEventDto updatedEvent);
    Task DeleteEventAsync(int id);
    Task<List<AttendeeDto>> GetAttendeesByEventIdAsync(int id);
    Task<string> SaveImageAsync(IFormFile imageFile);
    Task<GetEventsByCategoryDto> GetEventsByCategoryAsync(string categoryName);
}
