using EventPlanner.Controllers;
using EventPlanner.Models;
using EventPlanner.Server.Services.UserService;
using Moq;
using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventPlanner_UnitTesting.ControllerTests
{
    public class UserControllerTests
    {
        [Test]
        public async Task GetAllUsers_ReturnsOkResult_WithUsers()
        {
            // Arrange
            var expectedUsers = new List<User> { new User { Id = 1, FirstName = "User 1" } };
            var userServiceMock = new Mock<IUserService>();
            userServiceMock.Setup(service => service.GetAllUsersAsync())
                           .ReturnsAsync(expectedUsers);

            var controller = new UserController(userServiceMock.Object);

            // Act
            var result = await controller.GetAllUsers();

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);

            var users = okResult.Value as List<User>;
            Assert.IsNotNull(users);

            Assert.AreEqual(expectedUsers.Count, users.Count);

            var user = users.FirstOrDefault();
            Assert.IsNotNull(user);
            Assert.AreEqual(expectedUsers[0].Id, user.Id);
            Assert.AreEqual(expectedUsers[0].FirstName, user.FirstName);
        }

        [Test]
        public void ExampleTest()
        {
            // Add your test logic here
            Assert.Pass("This test passes!");
        }
    }
}
