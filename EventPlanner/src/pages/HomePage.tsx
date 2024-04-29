import React from "react";

import ControlledCarousel from "../components/Slider";
import Body from "../components/Body/Body";
import EventFooter from "../components/Footer/Footer";
import EventNavbar from "../components/Navbar";

const HomePage: React.FC = () => {
  return (
    <>
      <EventNavbar />
      <ControlledCarousel />
      <Body />
      <EventFooter />
    </>
  );
};

export default HomePage;
