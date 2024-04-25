import React, { useState } from "react";
import { useEventsFromCategory } from "../../hooks/useEventsFromCategory";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Modal } from "react-bootstrap";
import Navbar from "../Navbar";
import EventFooter from "../Footer/Footer";
import { parseDate } from "../../utils/parseDate";
import { parseHour } from "../../utils/parseHour";
import "./CategoryEvents.css";
import { useAttendee } from "../../hooks/useAttendee";
import { getUserInfoFromToken } from "../../utils/useUserFromToken";

const EventsList: React.FC = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const { data, isLoading, error } = useEventsFromCategory(categoryName ?? "");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // State to store the selected event
  const [showModal, setShowModal] = useState<boolean>(false); // State to manage modal visibility

  const handleEventClick = (event: unknown) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // const userInfo = getUserInfoFromToken();
  // async function useJoinEvent(eventId: number): Promise<void> {
  //   if (userInfo === null) {
  //     console.log("Not logged in");
  //   } else {
  //     try {
  //       const { data, isLoading, error } = useAttendee(
  //         { id: eventId },
  //         userInfo?.userId
  //       );
  //       // Do something with data, isLoading, and error if needed
  //     } catch (error) {
  //       console.error("Error joining event:", error);
  //     }
  //   }
  // }

  return error ? (
    <div>data couldn't be fetched</div>
  ) : isLoading ? (
    <div>Loading...</div>
  ) : (
    data && (
      <div>
        <Navbar />
        <h1>{categoryName}</h1>
        <div className="events">
          {data.events.map((event) => (
            <div key={event.id}>
              <Card
                style={{
                  width: "18rem",
                  border: "1px solid rgb(110, 29, 110)",
                }}
              >
                <Card.Img variant="top" src={event.imagePath} alt="foto" />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.organization}</Card.Text>
                  <Card.Text>{event.startTime}</Card.Text>
                  <Button
                    className="card-button"
                    onClick={() => handleEventClick(event)}
                  >
                    Details
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <Link to="/" className="btn btn-primary">
          Go Back to Categories
        </Link>
        <EventFooter />
        {selectedEvent && ( // Render modal if an event is selected
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Event Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Title: {selectedEvent.title}</p>
              <p>Organization: {selectedEvent.organization}</p>
              <p>Event Date: {parseDate(selectedEvent.startTime)}</p>
              <p>
                Event Time: {parseHour(selectedEvent.startTime)} -
                {parseHour(selectedEvent.endTime)}
              </p>
              <p>Description: {selectedEvent.description}</p>
              {/* Add more event details as needed */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary">Join</Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    )
  );
};

export default EventsList;
