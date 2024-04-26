using EventPlanner.Database;
using EventPlanner.Models;
using EventPlannerBackend.Dtos;
using Microsoft.EntityFrameworkCore;

namespace EventPlannerBackend.Services.EventService;

public class GetEventService : IGetEventService
{
    private readonly EventPlannerDbContext _dbContext;

    public GetEventService(EventPlannerDbContext dbContext)
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

    public async Task<IEnumerable<GetAttendeeDto>> GetAttendeesByEventIdAsync(int id)
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

    public async Task<IEnumerable<Event>> SearchEventsAsync(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return new List<Event>(); // Returns an empty list
        }

        // Checks if any event's organization, title, or description contains what the user searched for (maybe make it not case sensitive?)
        var events = await _dbContext.Events.Where(e => e.Organization.Contains(query)
            || e.Title.Contains(query)
            || e.Description.Contains(query))
            .ToListAsync();
        return events;
    }

    public async Task<IEnumerable<GetEventsSummaryDto>> GetFutureEventsAsync()
    {
        var utcNow = DateTime.UtcNow;

        return await _dbContext.Events
            .Where(e => e.StartTime > utcNow)
            .Select(e => new GetEventsSummaryDto
            {
                ImagePath = e.ImagePath,
                Organization = e.Organization,
                Title = e.Title,
                StartTime = e.StartTime
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<GetEventsSummaryDto>> GetPastEventsAsync()
    {
        var utcNow = DateTime.UtcNow;

        return await _dbContext.Events
            .Where(e => e.EndTime < utcNow)
            .Select(e => new GetEventsSummaryDto
            {
                ImagePath = e.ImagePath,
                Organization = e.Organization,
                Title = e.Title,
                StartTime = e.StartTime
            })
            .ToListAsync();
    }
}
