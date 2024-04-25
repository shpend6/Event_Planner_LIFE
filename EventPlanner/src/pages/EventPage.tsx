import Image from "react-bootstrap/Image";
import "./EventPage.css";
import useSWR from "swr";
import axios from "axios";
import EventNavbar from "../components/Navbar";
import EventFooter from "../components/Footer/Footer";
import { useParams } from "react-router-dom";

type Details = {
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

  categoryId: number; // If user is always null, you can set it as any
};

// eslint-disable-next-line react-hooks/rules-of-hooks

const fetcher = (url: string) =>
  axios.get<Details>(url).then((res) => res.data);

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: eventDetails, error } = useSWR<Details>(
    `https://localhost:7142/api/events/${id}`,
    fetcher
  );

  console.log(eventDetails);

  if (error) return <div>Error fetching data</div>;
  if (!eventDetails) return <div>Loading...</div>;

  return (
    <div className="event-page-details">
      <EventNavbar />
      <div>
        <div>
          <Image src={`/eventdetails/${eventDetails.id}`} fluid />
        </div>
        <div className="details">
          <div className="description">
            <h3>Title: {eventDetails.title}</h3>
            <h5>Organization: {eventDetails.organization}</h5>
            <p>Description: {eventDetails.description}</p>
            <p>State: {eventDetails.state}</p>
            <p>Location: {eventDetails.location}</p>
            <p>Capacity: {eventDetails.maxCapacity} Attendees</p>
          </div>
          <br />
          <div className="reservation">
            <h4>Reservation</h4> <hr />
            <p>Location: {eventDetails.location}</p>
            <p>Start Time: {eventDetails.startTime}</p>
            <p>End Time: {eventDetails.endTime}</p>
            <div className="button-div">
              <button>Attend</button>
            </div>
          </div>
        </div>
      </div>
      <EventFooter />
    </div>
  );
};

export default EventDetails;
