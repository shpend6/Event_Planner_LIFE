using EventPlanner.Models;

namespace EventPlannerBackend.Services.TokenService;

public interface ITokenService
{
    string GenerateToken(User user);
}
