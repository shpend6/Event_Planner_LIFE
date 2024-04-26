using EventPlanner.Controllers;
using EventPlanner.Database;
using EventPlanner.Models;
using EventPlanner.Server.Dtos;
using EventPlanner.Server.Services.UserService;
using EventPlannerBackend.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace EventPlanner.UnitTests.Controllers
{
    public class UserControllerTests
    {
        private UserController _controller;
        private Mock<IUserService> _userServiceMock;
        private Mock<EventPlannerDbContext> _dbContextMock;

        [SetUp]
        public void SetUp()
        {
            var options = new DbContextOptionsBuilder<EventPlannerDbContext>()
                .UseInMemoryDatabase(databaseName: "EventPlannerTestDb")
                .Options;
            _userServiceMock = new Mock<IUserService>();
            _dbContextMock = new Mock<EventPlannerDbContext>(options);
            _controller = new UserController(_dbContextMock.Object, _userServiceMock.Object);
        }

        [Test]
        public async Task GetUser_ReturnsOkResult_WithUser()
        {
            // Arrange
            var userId = 1;
            var getUserDto = new GetUserDto { Id = userId, FirstName = "User 1", LastName = "Doe", State = "New York", Email = "john@example.com" };
            _userServiceMock.Setup(service => service.GetUserByIdAsync(userId)).ReturnsAsync(getUserDto);

            // Act
            var result = await _controller.GetUser(userId);

            // Assert
            Assert.IsInstanceOf(typeof(OkObjectResult), result);
            var okResult = (OkObjectResult)result;
            var resultUser = (GetUserDto)okResult.Value;
            Assert.IsNotNull(resultUser);
            Assert.AreEqual(getUserDto.Id, resultUser.Id);
            Assert.AreEqual(getUserDto.FirstName, resultUser.FirstName);
        }

        [Test]
        public async Task SignUp_ReturnsCreatedAtActionResult_WithCreatedUser()
        {
            // Arrange
            var newUser = new SignUpDto { FirstName = "John", LastName = "Doe", Email = "john@example.com", Password = "password" };
            var createdUser = new User { Id = 1, FirstName = newUser.FirstName, LastName = newUser.LastName, Email = newUser.Email };
            _userServiceMock.Setup(service => service.CreateUserAsync(newUser)).ReturnsAsync(createdUser);

            // Act
            var result = await _controller.SignUp(newUser);

            // Assert
            Assert.IsInstanceOf(typeof(CreatedAtActionResult), result);
            var createdAtActionResult = (CreatedAtActionResult)result;
            Assert.AreEqual(nameof(UserController.GetUser), createdAtActionResult.ActionName);
            Assert.AreEqual(createdUser.Id, createdAtActionResult.RouteValues["id"]);
            Assert.AreEqual(createdUser, createdAtActionResult.Value);
        }

        [Test]
        public async Task Login_ReturnsOkResult_WithToken()
        {
            // Arrange
            var loginDto = new LoginDto { Email = "john@example.com", Password = "password" };
            var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmJmIjoxNjQ5NzQ3MjE2LCJleHAiOjE2NDk3NDg4MTYsImlhdCI6MTY0OTc0NzIxNn0.wO0iznZYX5hUQD_cOefAm7bvD33e9PydRR2P9bVg9gU";
            _userServiceMock.Setup(service => service.AuthenticateUserAsync(loginDto.Email, loginDto.Password)).ReturnsAsync(token);

            // Act
            var result = await _controller.Login(loginDto);

            // Assert
            Assert.IsInstanceOf(typeof(OkObjectResult), result);
            var okResult = (OkObjectResult)result;
            Assert.AreEqual(token, okResult.Value);
        }
    }
}
