import React from "react";
import useEventAttendees from "../../hooks/useEventsAttendees"; // adjust the path as necessary
interface ChildrenProps {
  eventId: number;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EventAttendees: React.FC<ChildrenProps> = ({ eventId }) => {
  const { data, isLoading, error } = useEventAttendees(eventId);

  if (isLoading) {
    return <p>Loading attendees...</p>;
  }

  if (error) {
    return <p>Error loading attendees: {error}</p>;
  }
  if (data?.length == 0)
    return (
      <>
        <h5>Attendees</h5>
        <p>There are no attendees signed up yet.</p>
      </>
    );
  return (
    <div>
      <h5>Attendees</h5>
      <ol>
        {data?.map((attendee) => (
          <li key={attendee.userId}>
            {attendee.firstName} {attendee.lastName}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default EventAttendees;
