import './Body.css'
import useSWR from "swr";
import axios from "axios";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'; // Import Link
import './Cards.css'

interface Events{
  id: number;
  imagePath: 'url';
  title: string;
  organization: string;
  startTime: string;
}
const fetcher = (url: string) => axios.get<Events[]>(url).then((res) => res.data);

const Body: React.FC = () => {
    const { data: events, error } = useSWR<Events[]>(
      "https://localhost:7142/api/events-summary",
      fetcher
    );
  
    if (error) return <div>Error fetching data</div>;
    if (!events) return <div>Loading...</div>;
  
    return (
        <>
        <div className='div-header-event'>
        <h2 className="header-events">Upcoming Events</h2>
        </div> <br/>
        <div className='main'> 
        {events.map((event) => (
         <div key={event.id} >
           <Card style={{ width: '18rem', border: '1px solid rgb(110, 29, 110)'}} >
           <Card.Img variant="top" src={event.imagePath} />
         <Card.Body>
           <Card.Title>{event.title}</Card.Title>
           <Card.Text>
             {event.organization}
           </Card.Text>
           <Card.Text>
             {event.startTime}
           </Card.Text>
           <Link to="/eventdetails"> {/* Use Link instead of Button */}
             <Button className='card-button'>Join</Button>
           </Link>
         </Card.Body>
           </Card>
         </div>
     ))}
   </div>
   </>
    );
  };

/*function Body(){
    return(
        <div className='card'>
            
            <FilterTickets></FilterTickets>
        </div>
    );
}*/
export default Body