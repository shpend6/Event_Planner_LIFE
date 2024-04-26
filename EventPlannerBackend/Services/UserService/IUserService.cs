using EventPlanner.Server.Dtos;
using EventPlanner.Models;
using EventPlannerBackend.Dtos;

namespace EventPlanner.Server.Services.UserService;

public interface IUserService
{
    Task<IEnumerable<GetUserDto>> GetAllUsersAsync();
    Task<GetUserDto> GetUserByIdAsync(int id);
    Task<User> CreateUserAsync(SignUpDto newUser);
    Task<string> AuthenticateUserAsync(string email, string password);
    Task DeleteUserAsync(int id);
    Task<List<Event>> GetUserCreatedEventsAsync(int id);
    Task<List<Event>> GetUserAttendingEventsAsync(int id);
}
