import 'bootstrap/dist/css/bootstrap.min.css';
import EventNavbar from '../components/Navbar';
import EventFooter from '../components/Footer/Footer';
import AddEventForm from '../components/Events/AddEvents';

const AddEvent = () => {
    return(
        <>
        <EventNavbar/>
        <AddEventForm/>
        <EventFooter/>
        </>
    );
}
export default AddEvent;
