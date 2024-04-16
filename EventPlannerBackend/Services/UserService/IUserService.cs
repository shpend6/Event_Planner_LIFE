using EventPlanner.Server.Dtos;
using EventPlanner.Models;

namespace EventPlanner.Server.Services.UserService;

public interface IUserService
{
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<User> GetUserByIdAsync(int id);
    Task<User> CreateUserAsync(SignUpDto newUser);
    Task<string> AuthenticateUserAsync(string email, string password);
    Task DeleteUserAsync(int id);
}
