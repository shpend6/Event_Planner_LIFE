import Image from 'react-bootstrap/Image';
import './EventPage.css'
import useSWR from "swr";
import axios from "axios";
import EventNavbar from '../components/Navbar';
import EventFooter from '../components/Footer';
import { useEvents } from "../hooks/useEvents";

interface events {
  id: number;
}

interface Details {
  id: number;
  userId: number;
  title: string;
  organization: string;
  imagePath: string;
  description: string;
  state: string;
  location: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
}

const fetcher = (url: string) => axios.get<Details[]>(url).then((res) => res.data);

const Eventss: React.FC = () => {
  const { data: eventdetails, error } = useSWR<Details[]>(
    "https://localhost:7142/api/events",
    fetcher
  );

  if (error) return <div>Error fetching data</div>;
  if (!eventdetails) return <div>Loading...</div>;

//TO DO: fix the image import
  return (
    <div className='event-page-details'><EventNavbar/>
      {eventdetails.map((Details) => (
        <div key={Details.id}>
        <div >
        <Image src='https://www.rave-travel.com/images/event/1903x902.jpg' fluid />
        </div>
      <div className="details">
        <div className='description'>
          {/* TODO: in the event page it should show only the event you clicked in the home page*/}
          <h3>Title: {Details.title}</h3>
          <h5>Organizaton: {Details.organization}</h5>
          <p>Description: {Details.description}</p>
          <p>State: {Details.state}</p>
          <p>Location: {Details.location}</p>
          <p>Capacity: {Details.maxCapacity} Attendies</p>
        </div>
        <br />
        <div className='reservation'>
          <h4>Reservation</h4> <hr />
          <p>Location: {Details.location}</p>
          <p>Start Time: {Details.startTime}</p>
          <p>End Time: {Details.endTime}</p> {/* Assuming scheduledTime is the end time */}
          <div className="button-div">
            <button>Attend</button>
          </div>
        </div>
      </div>
      </div>
      ))} 
      <EventFooter/>
    </div>

  );
}

export default Eventss;
