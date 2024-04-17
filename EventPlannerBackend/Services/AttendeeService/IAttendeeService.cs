namespace EventPlannerBackend.Services.AttendeeService;

public interface IAttendeeService
{
    Task<bool> JoinEventAsync(int userId, int eventId);
    Task<bool> CancelEventAttendanceAsync(int userId, int eventId);
}
