using EventPlanner.Models;
using EventPlannerBackend.Dtos;

namespace EventPlanner.Server.Services.GetEventService;

public interface IEventService
{
    Task<Event> CreateEventAsync(Event newEvent);
    Task UpdateEventAsync(int id, UpdateEventDto updatedEvent);
    Task DeleteEventAsync(int id);
    Task<string> SaveImageAsync(IFormFile imageFile);
}
