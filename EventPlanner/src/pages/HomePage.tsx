import React from "react";
import useSWR from "swr";
import axios from "axios";
import ControlledCarousel from "../components/Slider";
import Body from "../components/Body";


interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  createdEvents: unknown; // You can define the type for these properties as well if needed
  eventsAttending: unknown;
}
// besarta
const fetcher = (url: string) => axios.get<User[]>(url).then((res) => res.data);

const UserList: React.FC = () => {
  const { data: users, error } = useSWR<User[]>(
    "https://localhost:7142/api/users",
    fetcher
  );

  if (error) return <div>Error fetching data</div>;
  if (!users) return <div>Loading...</div>;

  return (
    <div>
      <h1>HomePage</h1>
      <ControlledCarousel/>
      <Body/>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>First Name:</strong> {user.firstName},{" "}
            <strong>Last Name:</strong> {user.lastName}, <strong>Email:</strong>{" "}
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
