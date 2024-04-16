import React from "react";
import { useUser } from "../hooks/useUsers";

// besarta

const UserList: React.FC = () => {
  const { data, isLoading, error } = useUser();

  return error ? (
    <div> data couldnt be fetched</div>
  ) : isLoading ? (
    <div> Loading..</div>
  ) : (
    data && (
      <div>
        <h1>User List</h1>
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              <strong>First Name:</strong> {user.firstName},{" "}
              <strong>Last Name:</strong> {user.lastName},{" "}
              <strong>Email:</strong> {user.email}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default UserList;
