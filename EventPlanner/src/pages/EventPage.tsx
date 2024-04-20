import Image from 'react-bootstrap/Image';
import './EventPage.css'

function EventPage(){
    return(
        <>
        <div>
            <Image src="https://www.rave-travel.com/images/event/lenny%20kravitz%20image-min%20(2).jpg" fluid />
        </div> 
        <div className="details">
            <div className='description'>
                <h3>Description</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quas at nihil, suscipit error non amet veritatis ullam eligendi laudantium cupiditate.</p>
            </div>
            <br />
            <div className='reservation'>
                <h4>Reservation</h4> <hr />
                <p>Location: Prishtine</p>
                <p>Start Time: 14.00/30/04/2024</p>
                <p>End Time: 18.00/30/04/2024</p>
                <p>Capacity: X Attendies</p> 
                <div className="button-div">
                <button>Attend</button>  
                </div>         
            </div>
        </div>
        </>
    );
}

export default EventPage;

