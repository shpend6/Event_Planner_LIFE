import "bootstrap/dist/css/bootstrap.min.css";
import EventNavbar from "../components/Navbar";
import EventFooter from "../components/Footer/Footer";
import AddEventForm from "../components/Events/AddEvents";
import "./AddEvents.css";

const AddEvent = () => {
  return (
    <>
      <EventNavbar />
      <main className="main-content">
        <AddEventForm />
      </main>
      <EventFooter />
    </>
  );
};
export default AddEvent;
