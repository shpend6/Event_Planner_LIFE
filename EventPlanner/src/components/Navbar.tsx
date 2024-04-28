import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUserInfoFromToken } from "../utils/useUserFromToken";

function EventNavbar() {
  const userInfo = getUserInfoFromToken();     //based on this
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
              {userInfo !== null ? (
                <Nav.Link href="/nearYou">Events Near you</Nav.Link>
              ) : (
                ""
              )}
            </Nav>
            <Nav>
              {userInfo === null ? (
                <Nav.Link href="/login" className="text-light me-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                    style={{ fontSize: "1.5em", marginRight: "0.5em" }}
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                  Log In
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link href='./profile' className="text-light me-4">
                  Hi, {userInfo?.userName} {/*navlinlk*/}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                  </Nav.Link>
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
