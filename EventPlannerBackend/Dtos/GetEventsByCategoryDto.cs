using EventPlanner.Models;

namespace EventPlannerBackend.Dtos;

public class GetEventsByCategoryDto
{
    public string CategoryName { get; set; }

    public IEnumerable<Event> Events { get; set; }
}
