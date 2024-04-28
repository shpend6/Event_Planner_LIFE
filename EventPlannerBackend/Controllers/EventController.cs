using EventPlanner.Dtos;
using EventPlanner.Models;
using EventPlanner.Server.Services.GetEventService;
using EventPlannerBackend.Dtos;
using EventPlannerBackend.Services.AttendeeService;
using EventPlannerBackend.Services.EventService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EventPlanner.Controllers;

[ApiController]
[Route("/api/events")]
public class EventController : ControllerBase
{
    private readonly IEventService _eventService;
    private readonly IGetEventService _getEventService;
    private readonly IAttendeeService _attendeeService;

    public EventController(IEventService eventService, IGetEventService getEventService, IAttendeeService attendeeService)
    {
        _eventService = eventService;
        _getEventService = getEventService;
        _attendeeService = attendeeService;
    }

    [HttpGet]
    [Route("/api/events-summary")]
    public async Task<IActionResult> GetEventsSummary()
    {
        var events = await _getEventService.GetEventsSummaryAsync();
        return Ok(events);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllEvents()
    {
        var events = await _getEventService.GetAllEventsAsync();
        return Ok(events);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEventById(int id)
    {
        var eventItem = await _getEventService.GetEventByIdAsync(id);

        if (eventItem == null)
            return NotFound("Event not found.");

        return Ok(eventItem);
    }

    [HttpGet("by-category/{categoryName}")]
    public async Task<IActionResult> GetEventsByCategory(string categoryName)
    {
        try
        {
            var eventsByCategory = await _getEventService.GetEventsByCategoryAsync(categoryName);
            return Ok(eventsByCategory);
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(exception.Message);
        }
    }

    [HttpGet("by-state")]
    [Authorize]
    public async Task<IActionResult> GetEventsByState()
    {
        var userState = HttpContext.User.FindFirstValue("userState");
        try
        {
            var eventsByState = await _getEventService.GetEventsByStateAsync(userState);
            return Ok(eventsByState);
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(exception.Message);
        }

    }

    [HttpGet("{id}/attendees")]
    public async Task<IActionResult> GetEventAttendees(int id)
    {
        var attendees = await _getEventService.GetAttendeesByEventIdAsync(id);
        return Ok(attendees);
    }

    [HttpGet("search/{query}")]
    public async Task<IActionResult> SearchEvents(string query)
    {
        var results = await _getEventService.SearchEventsAsync(query);

        if (results.Any())
            return Ok(results);

        return NotFound("Event not found.");
    }

    [HttpGet("future")]
    public async Task<IActionResult> GetFutureEvents()
    {
        var events = await _getEventService.GetFutureEventsAsync();
        return Ok(events);
    }

    [HttpGet("past")]
    public async Task<IActionResult> GetPastEvents()
    {
        var events = await _getEventService.GetPastEventsAsync();
        return Ok(events);
    }

    [HttpPost]
    [Authorize]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> CreateEvent([FromForm] CreateEventDto newEvent)
    {
        try
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

            return CreatedAtAction(nameof(GetEventById), new { id = createdEvent.Id }, createdEvent);
        }
        catch (ArgumentNullException exception)
        {
            return BadRequest(exception.Message);
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(exception.Message);
        }
    }

    [HttpPut("{id}")]
    [Authorize]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UpdateEvent(int id, [FromForm] UpdateEventDto updatedEvent)
    {
        try
        {
            var userId = HttpContext.User.FindFirstValue("userId");
            var eventToUpdate = await _getEventService.GetEventByIdAsync(id);

            if (eventToUpdate == null)
                return NotFound("Event not found.");

            if (eventToUpdate.UserId != int.Parse(userId))
                return Forbid("You are not authorized to update this event.");

            await _eventService.UpdateEventAsync(id, updatedEvent);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(exception.Message);
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(exception.Message);
        }
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        try
        {
            var userId = HttpContext.User.FindFirstValue("userId");
            var eventToDelete = await _getEventService.GetEventByIdAsync(id);

            if (eventToDelete == null)
                return NotFound("Event not found.");

            if (eventToDelete.UserId != int.Parse(userId))
                return Forbid("You are not authorized to delete this event.");

            await _eventService.DeleteEventAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(exception.Message);
        }
    }
}
