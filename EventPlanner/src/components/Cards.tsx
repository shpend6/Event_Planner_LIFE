import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'; // Import Link
import './Cards.css'

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
            <Link to="/eventdetails"> {/* Use Link instead of Button */}
              <Button className='card-button' >Go somewhere</Button>
            </Link>
          </Card.Body>
            </Card>
            <Card style={{ width: '18rem', border: '1px solid rgb(110, 29, 110)'}} >
          <Card.Img variant="top" src="https://www.rave-travel.com/images/event/2697.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              DD/MM/YY
            </Card.Text>
            <Button className='card-button' >Go somewhere</Button>
          </Card.Body>
            </Card>
            <Card style={{ width: '18rem', border: '1px solid purple'}}>
          <Card.Img variant="top" src="https://www.rave-travel.com/images/event/2676.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              DD/MM/YY
            </Card.Text>
            <Button className='card-button' >Go somewhere</Button>
          </Card.Body> 
            </Card>
            <Card style={{ width: '18rem', border: '1px solid rgb(110, 29, 110)'}} >
          <Card.Img variant="top" src="https://www.rave-travel.com/images/event/2683.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              DD/MM/YY
            </Card.Text>
            <Button className='card-button' >Go somewhere</Button>
          </Card.Body>
            </Card>
            <Card style={{ width: '18rem', border: '1px solid purple'}}>
          <Card.Img variant="top" src="https://www.rave-travel.com/images/event/2679.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              DD/MM/YY
            </Card.Text>
            <Button className='card-button' >Go somewhere</Button>
          </Card.Body> 
            </Card>
            <Card style={{ width: '18rem', border: '1px solid purple'}}>
          <Card.Img variant="top" src="https://www.rave-travel.com/images/event/2668.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              DD/MM/YY
            </Card.Text>
            <Button className='card-button' >Go somewhere</Button>
          </Card.Body> 
            </Card>
      </div>
    </div>
  );
}

export default Cardss;
