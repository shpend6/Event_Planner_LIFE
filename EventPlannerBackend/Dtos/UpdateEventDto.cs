namespace EventPlannerBackend.Dtos;

public class UpdateEventDto
{
    public string? Organization { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? State { get; set; }

    public string? Location { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public int? MaxCapacity { get; set; }

    public IFormFile? ImageFile { get; set; }
}
