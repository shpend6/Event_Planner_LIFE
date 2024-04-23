using EventPlanner.Database;
using EventPlanner.Models;
using EventPlannerBackend.Dtos;
using Microsoft.EntityFrameworkCore;

namespace EventPlanner.Server.Services.EventService;

public class EventService : IEventService
{
    private readonly EventPlannerDbContext _dbContext;

    public EventService(EventPlannerDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<GetEventsSummaryDto>> GetEventsSummaryAsync()
    {
        return await _dbContext.Events.Select(e => new GetEventsSummaryDto
        {
            ImagePath = e.ImagePath,
            Organization = e.Organization,
            Title = e.Title,
            StartTime = e.StartTime
        })
        .ToListAsync();
    }

    public async Task<IEnumerable<Event>> GetAllEventsAsync()
    {
        return await _dbContext.Events.ToListAsync();
    }

    public async Task<Event> GetEventByIdAsync(int id)
    {
        return await _dbContext.Events.FindAsync(id);
    }

    public async Task<Event> CreateEventAsync(Event newEvent)
    {
        bool existingEvent = await _dbContext.Events.AnyAsync(e => e.Location == newEvent.Location 
            && e.EndTime > newEvent.StartTime
            && e.StartTime < newEvent.EndTime);

        if (existingEvent)
        {
            throw new Exception("An event is already scheduled for this time at this location.");
        }

        _dbContext.Events.Add(newEvent);
        await _dbContext.SaveChangesAsync();

        return newEvent;
    }

    public async Task UpdateEventAsync(int id, UpdateEventDto updatedEvent)
    {
        var eventToUpdate = await _dbContext.Events.FindAsync(id);

        if (eventToUpdate != null)
        {
            bool conflictExists = await _dbContext.Events.AnyAsync(e => e.Id != id 
                && e.Location == updatedEvent.Location
                && e.EndTime > updatedEvent.StartTime
                && e.StartTime < updatedEvent.EndTime);

            if (conflictExists)
            {
                throw new Exception("An overlapping event is already scheduled at this location for this time.");
            }

            eventToUpdate.Organization = updatedEvent.Organization ?? eventToUpdate.Organization;
            eventToUpdate.Title = updatedEvent.Title ?? eventToUpdate.Title;
            eventToUpdate.Description = updatedEvent.Description ?? eventToUpdate.Description;
            eventToUpdate.State = updatedEvent.State ?? eventToUpdate.State;
            eventToUpdate.Location = updatedEvent.Location ?? eventToUpdate.Location;
            eventToUpdate.StartTime = updatedEvent.StartTime ?? eventToUpdate.StartTime;
            eventToUpdate.EndTime = updatedEvent.EndTime ?? eventToUpdate.EndTime;
            eventToUpdate.MaxCapacity = updatedEvent.MaxCapacity ?? eventToUpdate.MaxCapacity;

            if (updatedEvent.ImageFile != null)
            {
                eventToUpdate.ImagePath = await SaveImageAsync(updatedEvent.ImageFile);
            }

            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task DeleteEventAsync(int id)
    {
        var eventToDelete = await _dbContext.Events.FindAsync(id);

        if (eventToDelete != null)
        {
            _dbContext.Events.Remove(eventToDelete);
            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task<List<AttendeeDto>> GetAttendeesByEventIdAsync(int id)
    {
        return await _dbContext.Attendees
            .Where(a => a.EventId == id)
            .Select(a => new AttendeeDto
            {
                UserId = a.UserId,
                FirstName = a.User.FirstName,
                LastName = a.User.LastName,
                Email = a.User.Email,
                JoinedAt = a.JoinedAt
            })
            .ToListAsync();
    }

    public async Task<string> SaveImageAsync(IFormFile imageFile)
    {
        if (imageFile == null || imageFile.Length == 0)
            return null;

        var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images");
        if (!Directory.Exists(uploadsFolderPath))
            Directory.CreateDirectory(uploadsFolderPath);

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
        var filePath = Path.Combine(uploadsFolderPath, fileName);

        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await imageFile.CopyToAsync(fileStream);
        }

        return filePath;
    }
}
