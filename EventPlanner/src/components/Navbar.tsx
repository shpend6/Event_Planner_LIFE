import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link

function EventNavbar() {
  return (
    <Navbar style={{ backgroundColor: '#2d2d32' }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">Event Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link> {/* Change to /about for About page */}
            <Nav.Link href="/contact">Contact Us</Nav.Link> {/* Assuming you have a /contact route */}
            <Nav.Link href="/login">Log In</Nav.Link> {/* Change to /about for About page */}
            <Nav.Link href="/signup"> Sign up</Nav.Link> {/* Assuming you have a /contact route */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default EventNavbar;
