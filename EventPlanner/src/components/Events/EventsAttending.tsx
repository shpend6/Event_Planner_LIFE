import { Button, Card } from "react-bootstrap";
import { useEventsAttending } from "../../hooks/useEventsAttending";
import cancelEvent from "../../hooks/useCancelEvent";
import './EventsAttending.css'

interface Props {
  userId: string;
}

function EventsAttending({ userId }: Props) {
  const { data, isLoading, error } = useEventsAttending(userId || "");
  const bearerToken = localStorage.getItem("token");

  const handleCancelEvent = async (eventId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this event?"
    );

    if (confirmed) {
      if (bearerToken) {
        try {
          await cancelEvent(eventId, bearerToken);
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
      <h3>Events Attending</h3>
      <div>You haven't registered for any events.</div>
    </>
  ) : isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <h3>Events Attending</h3>
      <div className="user-attending-profile">
      {data?.map((e) => (
        <div className="user-profile">
          <Card style={{ width: "18rem" }} className="user-profile-card">
            <Card.Img
              variant="top"
              src={`https://bucket-3yw4ka.s3.amazonaws.com/${e.imagePath}`}
            />
            <Card.Body>
              <Card.Title>Hi, {e.title}</Card.Title>
              <Card.Text>{e.id}</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleCancelEvent(`${e.id}`)}
              >
                Cancel
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
      </div>
    </>
  );
}

export default EventsAttending;

