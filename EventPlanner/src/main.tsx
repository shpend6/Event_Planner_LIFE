import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { SWRConfig } from "swr";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route
import "./index.css";
import AboutComponent from './pages/AboutUs.tsx'; // Import your About component
import HomeComponent from './pages/HomePage.tsx'
import EventPage from './pages/EventPage.tsx'; // Import EventPage
import Contact from "./pages/ContactUs.tsx";
import Login from "./pages/LoginPage.tsx";
import Signup from './pages/Signup.tsx'
//import EventForm from './components/EventForm.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/about*" element={<AboutComponent />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/login" element={<Login/>} /> {/* Add route for LoginIn*/}
        <Route path="/signup" element={<Signup />} />
        <Route path="/eventdetails" element={<EventPage />} /> 
      </Routes>
    </Router>
  </React.StrictMode>
);
