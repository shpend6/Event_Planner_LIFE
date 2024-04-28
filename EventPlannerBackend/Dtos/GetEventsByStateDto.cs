using EventPlanner.Models;

namespace EventPlannerBackend.Dtos
{
    public class GetEventsByStateDto
    {

        public IEnumerable<Event> Events { get; set; }
    }
}
