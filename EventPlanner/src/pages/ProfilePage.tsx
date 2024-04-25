import { useState, useEffect } from 'react';
import { Card, Nav } from 'react-bootstrap';

interface User {
  id: number; 
  firstName: string;
  lastName: string;
  email: string;
  state: string;
  createdEvents: string; 
  eventsAttending: string; 
}


function UserCard({ user }: { user: User }) {
  return (
    <div className="col-md-4 mb-3">
      <Card>
        <Card style={{ border: '1px solid blueviolet ' }}></Card>
        <Card.Body>
          <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {user.email}
            <br />
            <strong>State:</strong> {user.state}
            <br />
            <strong>Created Events:</strong> {user.createdEvents}
            <br />
            <strong>Events Attending:</strong> {user.eventsAttending}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

function ProfilePage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://localhost:7142/api/users')
      .then(response => response.json())
      .then((data: User[]) => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="container">
      <h1>Profile</h1>
    
      <div className="row">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
