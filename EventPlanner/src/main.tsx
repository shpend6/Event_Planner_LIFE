import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { SWRConfig } from "swr";
import AboutComponent from "./pages/AboutUs.tsx";
import HomeComponent from "./pages/HomePage.tsx";
import EventDetails from "./pages/EventPage.tsx";
import Contact from "./pages/ContactUs.tsx";
import Login from "./pages/LoginPage.tsx";
import Signup from "./pages/Signup.tsx";
import CategoriesGrid from "./components/Categories/Categories.tsx";
import EventsList from "./components/Events/CategoryEvents.tsx";
import AddEvent from "./pages/AddEventPage.tsx";
import Profile from "./pages/ProfilePage.tsx";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/about" element={<AboutComponent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/eventdetails/:eventId" element={<EventDetails />} />
          <Route path="/" element={<CategoriesGrid />} />
          <Route path="/events/:categoryName" element={<EventsList />} />
          <Route path="/addevents" element={<AddEvent/>} />
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Router>
    </SWRConfig>
  </React.StrictMode>
);
