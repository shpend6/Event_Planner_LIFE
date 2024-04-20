import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route
//import App from "./pages/TestingPage.tsx";
import "./index.css";
import EventNavbar from './components/Navbar.tsx'
import "./components/Navbar.css"
import EventFooter from './components/Footer.tsx'
import "./components/Footer.css"
import './components/Slider.css'
import AdminComponent from './pages/AdminPage'; // Import your Admin component
import HomeComponent from './pages/HomePage.tsx'


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <EventNavbar/>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/admin/*" element={<AdminComponent />} />
        {/* The /admin/* route will match any route starting with /admin */}
      </Routes>
      <EventFooter />
    </Router>
  </React.StrictMode>
);
