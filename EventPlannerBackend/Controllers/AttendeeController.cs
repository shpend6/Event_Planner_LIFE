using EventPlannerBackend.Models.Enums;
using EventPlannerBackend.Services.AttendeeService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
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
        try
        {
            var userId = int.Parse(HttpContext.User.FindFirstValue("userId"));
            bool result = await _attendeeService.JoinEventAsync(userId, id);

            if (result)
                return Ok("Successfully joined the event.");
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(exception.Message);
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(exception.Message);
        }

        return BadRequest("Unable to join the event.");
    }

    [HttpPost("events/{id}/cancel")]
    [Authorize(Roles = nameof(UserRole.User))]
    public async Task<IActionResult> CancelAttendance(int id)
    {
        try
        {
            var userId = int.Parse(HttpContext.User.FindFirstValue("userId"));
            bool result = await _attendeeService.CancelEventAttendanceAsync(userId, id);

            if (result)
                return Ok("Attendance successfully canceled.");
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(exception.Message);
        }

        return BadRequest("Unable to cancel attendance.");
    }
}
