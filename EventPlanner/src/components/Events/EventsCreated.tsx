import { Button, Card } from "react-bootstrap";
import { useEventsCreated } from "../../hooks/useEventsCreated";
import deleteEvent from "../../hooks/useDeleteEvent";
import './EventsCreated.css'

interface Props {
  userId: string;
}

function EventsCreated({ userId }: Props) {
  const { data, isLoading, error } = useEventsCreated(userId || "");
  const bearerToken = localStorage.getItem("token");
  const handleDeleteEvent = async (eventId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirmed) {
      if (bearerToken) {
        try {
          await deleteEvent(eventId, bearerToken);
          window.location.reload();
        } catch (error: unknown) {
          throw new Error("Can't cancel event");
        }
      } else {
        console.log("No token found in localStorage");
      }
    }
  };
  return error ? (
    <>
      {" "}
      <h3>Events Created</h3>
      <p>You haven't created any events.</p>
    </>
  ) : isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <h3>Events Created</h3>
      <div className="user-created-profile">
      {data?.map((e) => (
        <div className="card">
          <Card  className="user-created-profile-card">
            <Card.Img
              variant="top"
              src={`https://bucket-3yw4ka.s3.amazonaws.com/${e.imagePath}`}
            />
            <Card.Body>
              <Card.Title>Hi, {e.title}</Card.Title>
              <Button
                variant="primary"
                onClick={() => {
                  handleDeleteEvent(`${e.id}`);
                }}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
      </div>
    </>
  );
}

export default EventsCreated;
