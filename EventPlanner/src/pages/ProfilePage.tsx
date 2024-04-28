import EventNavbar from "../components/Navbar";
import EventFooter from "../components/Footer/Footer";
import "./ProfilePage.css";
import { getUserInfoFromToken } from "../utils/useUserFromToken";
import EventsCreated from "../components/Events/EventsCreated";
import EventsAttending from "../components/Events/EventsAttending";

function Profile() {
  const userInfo = getUserInfoFromToken();

  return (
    <>
      <EventNavbar />
      <EventsAttending userId={userInfo?.userId || ""} />
      <EventsCreated userId={userInfo?.userId || ""} />
      <EventFooter />
    </>
  );
}
export default Profile;
