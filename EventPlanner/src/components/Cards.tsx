import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'; // Import Link
import './Cards.css'
import { useEventsSummary } from '../hooks/useEventsSummary';

const UserList: React.FC = () => {
  const { data, isLoading, error } = useEventsSummary();

  return error ? (
    <div> data couldnt be fetched</div>
  ) : isLoading ? (
    <div> Loading..</div>
  ) : (
    data && (
      <div> 
         <div className='div-header-event'>
        <h2 className="header-events">Upcoming Events</h2>
      </div>
      {data.map((EventsSummary) => (
        <>
          <div className='card-container'>
            <Card style={{ width: '18rem', border: '1px solid rgb(110, 29, 110)'}} >
            <Card.Img variant="top" src={EventsSummary.imagePath} />
          <Card.Body>
            <Card.Title>{EventsSummary.title}</Card.Title>
            <Card.Text>
              {EventsSummary.organisation}
            </Card.Text>
            <Card.Text>
              {EventsSummary.startTime}
            </Card.Text>
            <Link to="/eventdetails"> {/* Use Link instead of Button */}
              <Button className='card-button'>Join</Button>
            </Link>
          </Card.Body>
            </Card>
      </div>
      </>
      ))}
    </div>
    )
  );
}

/*
function Cardss(){
  return(
    <div> 
      <div className='div-header-event'>
        <h2 className="header-events">Upcoming Events</h2>
      </div>
      <div className='card-container'>
            <Card style={{ width: '18rem', border: '1px solid rgb(110, 29, 110)'}} >
          <Card.Img variant="top" src="https://www.rave-travel.com/images/event/2701.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              DD/MM/YY
            </Card.Text>
            <Link to="/eventdetails"> {/* Use Link instead of Button */
              /*
            }
              <Button className='card-button' >Go somewhere</Button>
            </Link>
          </Card.Body>
            </Card>
      </div>
    </div>
  );
}

export default Cardss;

*/