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

    public async Task<GetEventsByCategoryDto> GetEventsByCategoryAsync(string categoryName)
    {
        var categoryExists = await _dbContext.Categories
        .FirstOrDefaultAsync(c => c.Name == categoryName);

        if (categoryExists == null)
            throw new KeyNotFoundException("Category not found.");

        var eventsByCategory = await _dbContext.Events
            .Include(e => e.Category)
            .Where(e => e.Category.Name == categoryName)
            .ToListAsync();

        return new GetEventsByCategoryDto
        {
            CategoryName = categoryName,
            Events = eventsByCategory
        };
    }

    public async Task<IEnumerable<GetEventsSummaryDto>> GetEventsByStateAsync(string state)
    {
        return await _dbContext.Events.Where(e => e.State == state)
            .Select(e => new GetEventsSummaryDto
            {
                ImagePath = e.ImagePath,
                Organization = e.Organization,
                Title = e.Title,
                StartTime = e.StartTime
            })
            .ToListAsync();
    }

    public async Task<List<GetAttendeeDto>> GetAttendeesByEventIdAsync(int id)
    {
        return await _dbContext.Attendees
            .Where(a => a.EventId == id)
            .Select(a => new GetAttendeeDto
            {
                UserId = a.UserId,
                FirstName = a.User.FirstName,
                LastName = a.User.LastName,
                Email = a.User.Email,
                JoinedAt = a.JoinedAt
            })
            .ToListAsync();
    }

    public async Task<List<Event>> SearchEventsAsync(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return new List<Event>(); // Returns an empty list
        }

        // Checks if any event's organization, title, or description contains what the user searched for (maybe make it not case sensitive?)
        var events = await _dbContext.Events.Where(e => e.Organization.Contains(query) || e.Title.Contains(query) || e.Description.Contains(query)).ToListAsync();
        return events;
    }

    public async Task<Event> CreateEventAsync(Event newEvent)
    {
        if (newEvent == null)
            throw new ArgumentNullException(nameof(newEvent));

        bool existingEvent = await _dbContext.Events.AnyAsync(e => e.Location == newEvent.Location
            && e.EndTime > newEvent.StartTime
            && e.StartTime < newEvent.EndTime);

        if (existingEvent)
            throw new InvalidOperationException("An event is already scheduled for this time at this location.");

        _dbContext.Events.Add(newEvent);
        await _dbContext.SaveChangesAsync();

        return newEvent;
    }

    public async Task UpdateEventAsync(int id, UpdateEventDto updatedEvent)
    {
        var eventToUpdate = await _dbContext.Events.FindAsync(id);

        if (eventToUpdate == null)
            throw new KeyNotFoundException("Event not found.");

        bool conflictExists = await _dbContext.Events.AnyAsync(e => e.Id != id
            && e.Location == updatedEvent.Location
            && e.EndTime > updatedEvent.StartTime
            && e.StartTime < updatedEvent.EndTime);

        if (conflictExists)
            throw new InvalidOperationException("An overlapping event is already scheduled at this location for this time.");

        eventToUpdate.Organization = updatedEvent.Organization ?? eventToUpdate.Organization;
        eventToUpdate.Title = updatedEvent.Title ?? eventToUpdate.Title;
        eventToUpdate.Description = updatedEvent.Description ?? eventToUpdate.Description;
        eventToUpdate.State = updatedEvent.State ?? eventToUpdate.State;
        eventToUpdate.Location = updatedEvent.Location ?? eventToUpdate.Location;
        eventToUpdate.StartTime = updatedEvent.StartTime ?? eventToUpdate.StartTime;
        eventToUpdate.EndTime = updatedEvent.EndTime ?? eventToUpdate.EndTime;
        eventToUpdate.MaxCapacity = updatedEvent.MaxCapacity ?? eventToUpdate.MaxCapacity;

        if (updatedEvent.ImageFile != null)
            eventToUpdate.ImagePath = await SaveImageAsync(updatedEvent.ImageFile);

        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteEventAsync(int id)
    {
        var eventToDelete = await _dbContext.Events.FindAsync(id);

        if (eventToDelete == null)
            throw new KeyNotFoundException("Event not found.");

        _dbContext.Events.Remove(eventToDelete);
        await _dbContext.SaveChangesAsync();
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
