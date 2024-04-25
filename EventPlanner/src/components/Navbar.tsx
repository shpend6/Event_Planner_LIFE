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
