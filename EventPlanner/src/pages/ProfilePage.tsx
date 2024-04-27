import { getJoinedEvents } from "../utils/useJoinedEvents";
import EventNavbar from "../components/Navbar";
import EventFooter from "../components/Footer/Footer";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './ProfilePage.css'

function Profile(){
    const eventInfo = getJoinedEvents(); //Shpend check this

    return(
        <>
        <EventNavbar/>
        {eventInfo === null ? (
            <p>You didn't attend any event</p>
        ) : (
            <>
            <h3>Events Joined</h3>
            <div className="user-profile">
            <Card style={{ width: '18rem' }} className="user-profile-card">
              <Card.Img variant="top" src="{eventinfo?.imagePath}" />
              <Card.Body>
                <Card.Title>Hi, {eventInfo?.title}</Card.Title>
                <Button variant="primary">Cancel</Button>
               </Card.Body>
              </Card>
            </div>
            <h3>Events Created</h3>
            <div className="user-profile">
            <Card style={{ width: '18rem' }} className="user-profile-card">
              <Card.Img variant="top" src="{eventinfo?.imagePath}" />
              <Card.Body>
                <Card.Title>Hi, {eventInfo?.title}</Card.Title>
                <Button variant="primary">Delete</Button>
               </Card.Body>
              </Card>
            </div>
            </>
        )}
        <EventFooter/>
        
        </>
    );
    
}
export default Profile;
