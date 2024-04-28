using EventPlanner.Models;
using EventPlannerBackend.Dtos;

namespace EventPlannerBackend.Services.EventService;

public interface IGetEventService
{
    Task<IEnumerable<GetEventsSummaryDto>> GetEventsSummaryAsync();
    Task<IEnumerable<Event>> GetAllEventsAsync();
    Task<Event> GetEventByIdAsync(int id);
    Task<GetEventsByCategoryDto> GetEventsByCategoryAsync(string categoryName);
    Task<GetEventsByStateDto> GetEventsByStateAsync(string state);
    Task<IEnumerable<GetAttendeeDto>> GetAttendeesByEventIdAsync(int id);
    Task<IEnumerable<Event>> SearchEventsAsync(string query);
    Task<IEnumerable<GetEventsSummaryDto>> GetFutureEventsAsync();
    Task<IEnumerable<GetEventsSummaryDto>> GetPastEventsAsync();
}
