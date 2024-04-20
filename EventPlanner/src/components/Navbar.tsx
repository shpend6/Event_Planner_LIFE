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
            <Nav.Link href="/admin">About</Nav.Link> {/* Change to /admin for Admin page */}
            <Nav.Link href="/contact">Contact</Nav.Link> {/* Assuming you have a /contact route */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default EventNavbar;
