namespace EventPlannerBackend.Dtos;

public class GetEventsSummaryDto
{
    public int Id { get; set; }

    public string ImagePath { get; set; }

    public string Organization { get; set; }

    public string Title { get; set; }

    public DateTime StartTime { get; set; }
}
