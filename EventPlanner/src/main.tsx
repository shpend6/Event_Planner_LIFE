import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/TestingPage.tsx";
import "./index.css";
import EventNavbar from './components/Navbar.tsx'
import "./components/Navbar.css"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EventNavbar></EventNavbar>
  </React.StrictMode>
);
