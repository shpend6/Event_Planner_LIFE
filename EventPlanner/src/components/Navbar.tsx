
import React, { useState, FormEvent } from "react";
import { Navbar, Container, Nav, Form, Button, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function EventNavbar() {
  // State to store the search query and search results
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]); 

  // Function to handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle form submission
  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://localhost:7142/api/events?q=${searchQuery}`);
      
      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();
        // Update search results state
        setSearchResults(data);
      } else {
        console.error("Failed to fetch data from API");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to clear search results
  const clearSearchResults = () => {
    setSearchResults([]);
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
            <Form onSubmit={handleSearchSubmit} className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button type="submit" variant="outline-success" style={{ background: 'linear-gradient(111.3deg, rgb(74, 105, 187) 9.6%, rgb(205, 77, 204) 93.6%)', color: 'white' }}>Search</Button>
              <div className="ms-4"></div>
              <Nav.Link href="/login" className="d-flex align-items-center text-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle me-1" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
              </Nav.Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Display search results */}
      {searchResults.length > 0 && (
        <Container className="mt-4">
          <Row>
            <Button onClick={clearSearchResults} className="btn-close" aria-label="Close"></Button>
            {searchResults.map((result, index) => (
              <Col key={index} xs={12} md={4} className="mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{result.title}</h5>
                    <p className="card-text">{result.description}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default EventNavbar;
