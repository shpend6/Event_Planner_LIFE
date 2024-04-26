using EventPlanner.Controllers;
using EventPlanner.Models;
using Moq;
using Microsoft.AspNetCore.Mvc;
using EventPlannerBackend.Services.EventService;

namespace EventPlanner.UnitTests.Controllers
{
    public class EventControllerTests
    {
        [Test]
        public async Task GetAllEvents_ReturnsOkResult_WithEvents()
        {
            // Arrange
            var expectedEvents = new List<Event> { new Event { Id = 1, Title = "Event 1" } };
            var eventServiceMock = new Mock<IGetEventService>();
            eventServiceMock.Setup(service => service.GetAllEventsAsync())
                            .ReturnsAsync(expectedEvents);
            var controller = new EventController(null, eventServiceMock.Object, null);

            // Act
            var result = await controller.GetAllEvents();

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);

            var events = okResult.Value as List<Event>;
            Assert.IsNotNull(events);
            Assert.AreEqual(expectedEvents.Count, events.Count);

            var ev = events.FirstOrDefault();
            Assert.IsNotNull(ev);
            Assert.AreEqual(expectedEvents[0].Id, ev.Id);
            Assert.AreEqual(expectedEvents[0].Title, ev.Title);
            // Add more assertions as needed for other properties
        }

    }
}
