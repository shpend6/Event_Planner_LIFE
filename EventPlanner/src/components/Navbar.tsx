import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUserInfoFromToken } from "../utils/useUserFromToken";

function EventNavbar() {
  const userInfo = getUserInfoFromToken();
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    // Redirect to home page
    window.location.href = "/";
  };
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">Event Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About Us</Nav.Link>
              <Nav.Link href="/contact">Contact Us</Nav.Link>
            </Nav>
            <Nav>
              {userInfo === null ? (
                <Nav.Link href="/login" className="text-light me-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16" style={{ fontSize: "1.5em", marginRight: "0.5em" }}>
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                  </svg>
                  Log In
                </Nav.Link>
              ) : (
                <>
                  {/* Display a greeting with username */}
                  <Nav.Item className="text-light me-4">
                    Hi, {userInfo?.userName}
                  </Nav.Item>
                  {/* Logout button */}
                  <Button variant="outline-light" onClick={handleLogout}>
                    Log Out
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default EventNavbar;
