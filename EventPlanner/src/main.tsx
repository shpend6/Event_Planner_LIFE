import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { SWRConfig } from "swr";
import AboutComponent from './pages/AboutUs.tsx'; 
import HomeComponent from './pages/HomePage.tsx';
import EventPage from './pages/EventPage.tsx'; 
import Contact from "./pages/ContactUs.tsx";
import Login from "./pages/LoginPage.tsx";
import Signup from './pages/Signup.tsx';
import { jwtDecode } from "jwt-decode";  // Import jwtDecode


// Function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return false;
  }

  try {
    // Decode the JWT token
    const decodedToken: { exp: number } = jwtDecode(token);
    
    // Check if the token has expired
    if (decodedToken.exp * 1000 < Date.now()) {
      // Token has expired
      return false;
    }

    // Token is not expired
    return true;
  } catch (error) {
    // Token decoding failed
    return false;
  }
};

// Define the type for the element prop
type RouteElement = React.ReactElement<any, any> | null;

// PrivateRoute component to protect routes
const PrivateRoute: React.FC<{ element: RouteElement } & React.ComponentProps<typeof Route>> = ({ element, ...rest }) => {
  // If user is authenticated, render the component, otherwise redirect to login page
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/about" element={<AboutComponent />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/login" element={<Login/>} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<PrivateRoute element={<EventPage />} />} />
         {/* Protected route */}
      </Routes>
    </Router>
  </React.StrictMode>
);
