using EventPlanner.Dtos;
using EventPlanner.Models;
using EventPlanner.Server.Services.EventService;
using Microsoft.AspNetCore.Mvc;

namespace EventPlanner.Controllers;

[ApiController]
[Route("/api/events")]
public class EventController : ControllerBase
{
    private readonly IEventService _eventService;

    public EventController(IEventService eventService)
    {
        _eventService = eventService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllEvents()
    {
        var events = await _eventService.GetAllEventsAsync();
        return Ok(events);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEvent(int id)
    {
        var eventItem = await _eventService.GetEventByIdAsync(id);
        if (eventItem == null)
        {
            return NotFound();
        }

        return Ok(eventItem);
    }

    [HttpPost]
    public async Task<IActionResult> CreateEvent([FromBody] EventDto newEvent)
    {
        var eventToCreate = new Event
        {
            UserId = newEvent.UserId, // Replace with actual user session or identity later
            Title = newEvent.Title,
            Description = newEvent.Description,
            Location = newEvent.Location,
            ScheduledTime = newEvent.ScheduledTime,
            MaxCapacity = newEvent.MaxCapacity
        };

        var createdEvent = await _eventService.CreateEventAsync(eventToCreate);

        return Ok(createdEvent);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEvent(int id, [FromBody] EventDto updatedEvent)
    {
        var eventItem = await _eventService.GetEventByIdAsync(id);
        if (eventItem == null)
        {
            return NotFound();
        }

        var eventToUpdate = new Event
        {
            Title = updatedEvent.Title,
            Description = updatedEvent.Description,
            Location = updatedEvent.Location,
            ScheduledTime = updatedEvent.ScheduledTime,
            MaxCapacity = updatedEvent.MaxCapacity
        };

        await _eventService.UpdateEventAsync(id, eventToUpdate);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var eventToDelete = await _eventService.GetEventByIdAsync(id);
        if (eventToDelete == null)
        {
            return NotFound();
        }

        await _eventService.DeleteEventAsync(eventToDelete.Id);
        return NoContent();
    }
}
