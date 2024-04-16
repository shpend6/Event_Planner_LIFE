import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/TestingPage.tsx";
import "./index.css";
import EventNavbar from './components/Navbar.tsx'
import "./components/Navbar.css"
import EventFooter from './components/Footer.tsx'
import "./components/Footer.css"
import ControlledCarousel from './components/Slider.tsx'
import './components/Slider.css'


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EventNavbar></EventNavbar>
    <ControlledCarousel></ControlledCarousel>
    <EventFooter></EventFooter>
  </React.StrictMode>
);
