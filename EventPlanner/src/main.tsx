import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import { SWRConfig } from "swr";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route
import "./index.css";
import EventNavbar from './components/Navbar.tsx'
import "./components/Navbar.css"
import EventFooter from './components/Footer.tsx'
import AboutComponent from './pages/AboutUs.tsx'; // Import your About component
import HomeComponent from './pages/HomePage.tsx'
import EventPage from './pages/EventPage.tsx'; // Import EventPage
import Contact from "./pages/ContactUs.tsx";
import Login from "./pages/LoginPage.tsx";
import Signup from './pages/Signup.tsx'


// const fetcher = (url: string) => fetch(url).then((res) => res.json());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EventNavbar/>
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/about*" element={<AboutComponent />} />
        <Route path="/contact" element={<Contact />} /> {/* Add route for EventPage */}
        <Route path="/login" element={<Login/>} /> {/* Add route for EventPage */}
        <Route path="/signup" element={<Signup />} /> {/* Add route for EventPage */}
        <Route path="/eventdetails" element={<EventPage />} /> {/* Add route for EventPage */}
      </Routes>
      <EventFooter />
    </Router>
  </React.StrictMode>
);
