using System.Collections.Generic;
using System.Threading.Tasks;
using EventPlanner.Models;
using EventPlanner.Server.Dtos;
using EventPlanner.Server.Services.UserService;

namespace EventPlanner.Server.Mocks
{
    public class MockUserService : IUserService
    {
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            // Your implementation
            return await Task.FromResult<IEnumerable<User>>(new List<User>());
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            // Your implementation
            return await Task.FromResult<User>(new User());
        }

        public async Task<User> CreateUserAsync(SignUpDto newUser)
        {
            // Your implementation
            return await Task.FromResult<User>(new User());
        }

        public async Task<string> AuthenticateUserAsync(string email, string password)
        {
            // Your implementation
            return await Task.FromResult<string>("token");
        }

        public async Task DeleteUserAsync(int id)
        {
            // Your implementation
            await Task.CompletedTask;
        }

        public async Task<List<Event>> GetUserCreatedEventsAsync(int id)
        {
            // Your implementation
            return await Task.FromResult<List<Event>>(new List<Event>());
        }

        public async Task<List<Event>> GetUserAttendingEventsAsync(int id)
        {
            // Your implementation
            return await Task.FromResult<List<Event>>(new List<Event>());
        }
    }
}
