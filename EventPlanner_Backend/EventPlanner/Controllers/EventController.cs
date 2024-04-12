using EventPlanner.Database;
using EventPlanner.Dtos;
using EventPlanner.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventPlanner.Controllers;

[ApiController]
[Route("/api/events")]
public class EventController : ControllerBase
{
    // After EventService is implemented, remove the context and inject the service instead
    private readonly EventPlannerDbContext _context;

    public EventController(EventPlannerDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllEvents()
    {
        var events = await _context.Events.ToListAsync();
        return Ok(events);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEvent(int id)
    {
        var eventItem = await _context.Events.FindAsync(id);
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
            UserId = 1, // Assumed a fixed user ID for now, will replace with actual user later
            Title = newEvent.Title,
            Description = newEvent.Description,
            Location = newEvent.Location,
            ScheduledTime = newEvent.ScheduledTime,
            MaxCapacity = newEvent.MaxCapacity
        };

        _context.Events.Add(eventToCreate);
        await _context.SaveChangesAsync();

        return Ok(eventToCreate);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEvent(int id, [FromBody] EventDto updatedEvent)
    {
        var eventToUpdate = await _context.Events.FindAsync(id);
        if (eventToUpdate == null)
        {
            return NotFound();
        }

        eventToUpdate.Title = updatedEvent.Title;
        eventToUpdate.Description = updatedEvent.Description;
        eventToUpdate.Location = updatedEvent.Location;
        eventToUpdate.ScheduledTime = updatedEvent.ScheduledTime;
        eventToUpdate.MaxCapacity = updatedEvent.MaxCapacity;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var eventToDelete = await _context.Events.FindAsync(id);
        if (eventToDelete == null)
        {
            return NotFound();
        }

        _context.Events.Remove(eventToDelete);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
