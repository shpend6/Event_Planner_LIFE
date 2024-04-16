import React from "react";
import { useEvents } from "../hooks/useEvents";

// besarta

const UserList: React.FC = () => {
  const { data, isLoading, error } = useEvents();

  return error ? (
    <div> data couldnt be fetched</div>
  ) : isLoading ? (
    <div> Loading..</div>
  ) : (
    data && (
      <div>
        <h1>Events List</h1>
        <ul>
          {data.map((event) => (
            <li key={event.id}>
              <strong>Owner id:</strong> {event.userId},{" "}
              <strong>Title: {event.title}</strong>,{" "}
              <strong>Description:</strong> {event.description},{" "}
              <strong>Location: {event.location}</strong>,{" "}
              <strong>Time: {event.scheduledTime}</strong>,{" "}
              <strong>Capacity: {event.maxCapacity}</strong>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default UserList;
