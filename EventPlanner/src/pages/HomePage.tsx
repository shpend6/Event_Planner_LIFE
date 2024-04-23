import React from "react";
import useSWR from "swr";
import axios from "axios";
import ControlledCarousel from "../components/Slider";
import Body from "../components/Body";
import EventFooter from "../components/Footer";
import EventNavbar from "../components/Navbar";
//import EventForm from "../components/EventForm";
import { Card } from "react-bootstrap"; 

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  createdEvents: unknown;
  eventsAttending: unknown;
}

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
      <EventNavbar/>
      <ControlledCarousel/>
      <Body/>
      <EventNavbar />
      <ControlledCarousel />
      <Body />
      <h1>User List</h1>
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4 mb-4" key={user.id}>
            <Card>
              <Card.Body>
                <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {user.email}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <EventFooter />
    </div>
  );
};

export default UserList;
