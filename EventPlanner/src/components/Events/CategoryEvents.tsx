/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useEventsFromCategory } from "../../hooks/useEventsFromCategory";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Modal } from "react-bootstrap";
import Navbar from "../Navbar";
import EventFooter from "../Footer/Footer";
import { parseDate } from "../../utils/parseDate";
import { parseHour } from "../../utils/parseHour";
import joinEvent from "../../hooks/useCreateAttendee"; // Import the joinEvent hook
import "./CategoryEvents.css";
import EventAttendees from "./EventAttendees";
// interface Props {
//   eventId: number;
// }
const EventsList: React.FC = () => {
  interface Event {
    id: number;
    title: string;
    organization: string;
    startTime: string;
    endTime: string;
    description: string;
    imagePath: string;
  }
  const { categoryName } = useParams<{ categoryName?: string }>();
  const { data, isLoading, error } = useEventsFromCategory(categoryName ?? "");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [responseData, setResponseData] = useState<any>(null); // State to hold response data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (responseData) {
      const timer = setTimeout(() => {
        setResponseData(null); // Clear response data after 3 seconds
      }, 1500);

      return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }
  }, [responseData]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleJoinEvent = async (eventId: string) => {
    const bearerToken = localStorage.getItem("token");
    if (bearerToken) {
      try {
        const data = await joinEvent(eventId, bearerToken); // Call the joinEvent hook
        setResponseData(data); // Log the response data
        // Optionally, you can handle success here, e.g., display a success message
      } catch (error: any) {
        setResponseData("Cant join this event!");
        // Optionally, you can handle error here, e.g., display an error message
      }
    } else {
      console.log("No token found in localStorage");
      // Optionally, you can handle not having a token here, e.g., redirect to login page
    }
  };

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
                <Card.Img
                  variant="top"
                  src={`https://bucket-3yw4ka.s3.amazonaws.com/${event.imagePath}`}
                  alt="foto"
                />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.organization}</Card.Text>
                  <Card.Text>{parseDate(event.startTime)}</Card.Text>
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
        {selectedEvent && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Card.Img
                variant="top"
                src={`https://bucket-3yw4ka.s3.amazonaws.com/${selectedEvent.imagePath}`}
                alt="foto"
              />
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
              <EventAttendees eventId={selectedEvent.id} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => handleJoinEvent(selectedEvent.id)}
              >
                Join
              </Button>
              {responseData && (
                <div className="response-data-container">
                  <pre>{responseData}</pre>
                </div>
              )}
              <br></br>
              {/* <EventAttendees eventId={selectedEvent.id} /> */}
            </Modal.Footer>
          </Modal>
        )}
      </div>
    )
  );
};

export default EventsList;
