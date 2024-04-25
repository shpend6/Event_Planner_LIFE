using EventPlanner.Dtos;
using EventPlanner.Models;
using EventPlanner.Server.Services.EventService;
using EventPlannerBackend.Dtos;
using EventPlannerBackend.Models.Enums;
using EventPlannerBackend.Services.AttendeeService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EventPlanner.Controllers;

[ApiController]
[Route("/api/events")]
public class EventController : ControllerBase
{
    private readonly IEventService _eventService;
    private readonly IAttendeeService _attendeeService;

    public EventController(IEventService eventService, IAttendeeService attendeeService)
    {
        _eventService = eventService;
        _attendeeService = attendeeService;
    }

    [HttpGet]
    [Route("/api/events-summary")]
    public async Task<IActionResult> GetEventsSummary()
    {
        var events = await _eventService.GetEventsSummaryAsync();
        return Ok(events);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllEvents()
    {
        var events = await _eventService.GetAllEventsAsync();
        return Ok(events);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEventById(int id)
    {
        var eventItem = await _eventService.GetEventByIdAsync(id);
        if (eventItem == null)
        {
            return NotFound("No events found.");
        }

        return Ok(eventItem);
    }

    [HttpGet("by-category/{categoryName}")]
    public async Task<IActionResult> GetEventsByCategory(string categoryName)
    {
        var eventsByCategory = await _eventService.GetEventsByCategoryAsync(categoryName);

        if (eventsByCategory == null)
        {
            return NotFound();
        }

        return Ok(eventsByCategory);
    }

    [HttpGet("{id}/attendees")]
    public async Task<IActionResult> GetEventAttendees(int id)
    {
        var attendees = await _eventService.GetAttendeesByEventIdAsync(id);
        return Ok(attendees);
    }

    [HttpGet("search/{query}")]
    public async Task<IActionResult> SearchEvents(string query)
    {
        var results = await _eventService.SearchEventsAsync(query);
        if (results.Any())
        {
            return Ok(results);
        }

        return NotFound("No events found.");
    }

    [HttpPost]
    [Authorize]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> CreateEvent([FromForm] CreateEventDto newEvent)
    {
        // We retrieve user ID from the token, and parse it into the event object
        var userId = HttpContext.User.FindFirstValue("userId");

        var eventToCreate = new Event
        {
            UserId = int.Parse(userId),
            Organization = newEvent.Organization,
            Title = newEvent.Title,
            Description = newEvent.Description,
            State = newEvent.State,
            Location = newEvent.Location,
            StartTime = newEvent.StartTime,
            EndTime = newEvent.EndTime,
            MaxCapacity = newEvent.MaxCapacity,
            ImagePath = await _eventService.SaveImageAsync(newEvent.ImageFile),
            CategoryId = newEvent.CategoryId
    };

        var createdEvent = await _eventService.CreateEventAsync(eventToCreate);

        return Ok(createdEvent);
    }

    [HttpPut("{id}")]
    [Authorize]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UpdateEvent(int id, [FromForm] UpdateEventDto updatedEvent)
    {
        var userId = HttpContext.User.FindFirstValue("userId");
        var checkEventExists = await _eventService.GetEventByIdAsync(id);

        if (checkEventExists == null)
        {
            return NotFound("No events found.");
        }

        if (checkEventExists.UserId != int.Parse(userId))
        {
            return Forbid();
        }

        await _eventService.UpdateEventAsync(id, updatedEvent);

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var userId = HttpContext.User.FindFirstValue("userId");
        var eventToDelete = await _eventService.GetEventByIdAsync(id);

        if (eventToDelete == null)
        {
            return NotFound("No events found.");
        }

        if (eventToDelete.UserId != int.Parse(userId))
        {
            return Forbid();
        }

        await _eventService.DeleteEventAsync(eventToDelete.Id);
        return NoContent();
    }
}
