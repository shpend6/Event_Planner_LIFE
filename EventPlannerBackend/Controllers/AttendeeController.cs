using EventPlannerBackend.Models.Enums;
using EventPlannerBackend.Services.AttendeeService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EventPlannerBackend.Controllers;

[ApiController]
[Route("/api")]
public class AttendeeController : ControllerBase
{
    private readonly IAttendeeService _attendeeService;

    public AttendeeController(IAttendeeService attendeeService)
    {
        _attendeeService = attendeeService;
    }

    [HttpPost("events/{id}/join")]
    [Authorize(Roles = nameof(UserRole.User))]
    public async Task<IActionResult> JoinEvent(int id)
    {
        var userId = int.Parse(HttpContext.User.FindFirstValue("userId"));
        var result = await _attendeeService.JoinEventAsync(userId, id);

        if (!result)
        {
            return BadRequest("Unable to join the event.");
        }
        return Ok("Successfully joined the event.");
    }

    [HttpPost("events/{id}/cancel")]
    [Authorize(Roles = nameof(UserRole.User))]
    public async Task<IActionResult> CancelAttendance(int id)
    {
        var userId = int.Parse(HttpContext.User.FindFirstValue("userId"));
        var result = await _attendeeService.CancelEventAttendanceAsync(userId, id);

        if (!result)
        {
            return NotFound("Attendance record not found.");
        }
        return Ok("Attendance successfully canceled.");
    }
}
