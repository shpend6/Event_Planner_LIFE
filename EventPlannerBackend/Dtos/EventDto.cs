namespace EventPlanner.Dtos;

public class EventDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }
    public DateTime ScheduledTime { get; set; }
    public int MaxCapacity { get; set; }

}
