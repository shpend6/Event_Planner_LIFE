import React, { useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddEvents.css";
// import { getUserInfoFromToken } from "../../utils/useUserFromToken";

const AddEventForm = () => {
  // State variables for managing form inputs, loading, and errors
  const [organization, setOrganization] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [location, setLocation] = useState("");
  const [maxcapacity, setMaxcapacity] = useState("");
  const [imagefile, setImagefile] = useState("");
  const [categoryid, setCategoryid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create userData object with form input values
      const eventData = {
        organization,
        title,
        description,
        state,
        starttime,
        endtime,
        location,
        maxcapacity,
        imagefile,
        categoryid,
      };
      // Reset form inputs, error, and loading state after successful signup
      await addevent(eventData);
      setOrganization("");
      setTitle("");
      setDescription("");
      setState("");
      setStarttime("");
      setEndtime("");
      setLocation("");
      setMaxcapacity("");
      setImagefile("");
      setCategoryid("");
      setError("");
      setLoading(false);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message); // Set error message if signup fails
      setLoading(false);
    }
  };

  const addevent = async (eventData: {
    organization: string;
    title: string;
    description: string;
    state: string;
    starttime: string;
    endtime: string;
    location: string;
    maxcapacity: string;
    imagefile: string;
    categoryid: string;
  }) => {
    try {
      const response = await fetch("https://localhost:7142/api/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to add Event");
      }
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "Failed to add Event");
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
    >
      <Form
        onSubmit={handleSubmit}
        className="p-4 rounded shadow border border-white"
      >
        <h2 className="text-center mb-4">
          <span> Add Event </span>
        </h2>
        <Form.Group controlId="formOrganization" className="mb-3">
          <Form.Label>Organization</Form.Label>
          <Form.Control
            type="text"
            placeholder="LIFE"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="py-2 px-3 border border-white rounded"
          />
        </Form.Group>

        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="py-2 px-3 border border-white rounded"
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="py-2 px-3 border border-white rounded"
          />
        </Form.Group>

        <Form.Group controlId="formState" className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            as="select"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="py-2 px-3 border border-white rounded"
          >
            <option value="">Select your state</option>
            <option value="Germany">Germany</option>
            <option value="Kosovo">Kosovo</option>
            <option value="Canada">Canada</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formCategory" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={categoryid}
            onChange={(e) => setCategoryid(e.target.value)}
            className="py-2 px-3 border border-white rounded"
          >
            <option value="">Select your category</option>
            <option value="1">Music</option>
            <option value="2">Dance</option>
            <option value="3">Opera</option>
            <option value="4">Health</option>
            <option value="5">Holidays</option>
            <option value="6">Hobbies</option>
            <option value="7">Bussines</option>
            <option value="8">Food & Drinks</option>
            <option value="9">Nightlife</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formStarttime" className="mb-3">
          <Form.Label>Starttime</Form.Label>
          <Form.Control
            type="time"
            placeholder="Enter your last name"
            value={starttime}
            onChange={(e) => setStarttime(e.target.value)}
            className="py-2 px-3 border border-white rounded"
          />
        </Form.Group>

        <Form.Group controlId="formEndtime" className="mb-3">
          <Form.Label>Endtime</Form.Label>
          <Form.Control
            type="time"
            placeholder="Enter your last name"
            value={endtime}
            onChange={(e) => setEndtime(e.target.value)}
            className="py-2 px-3 border border-white rounded"
          />
        </Form.Group>

        <Form.Group controlId="formMaxcapacity" className="mb-3">
          <Form.Label>Max Capacity</Form.Label>
          <Form.Control
            type="number"
            placeholder="500"
            value={maxcapacity}
            onChange={(e) => setMaxcapacity(e.target.value)}
            className="py-2 px-3 border border-white rounded"
          />
        </Form.Group>

        <Form.Group controlId="formImagefile" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="file"
            placeholder="Photo"
            value={imagefile}
            onChange={(e) => setImagefile(e.target.value)}
            className="py-2 px-3 border border-white rounded"
          />
        </Form.Group>

        {error && <div className="text-danger mb-3">{error}</div>}

        <Button
          type="submit"
          disabled={loading}
          className="py-2 addevent-btn"
          style={{
            background:
              "linear-gradient(111.3deg, rgb(74, 105, 187) 9.6%, rgb(205, 77, 204) 93.6%)",
            border: "none",
          }}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Add"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddEventForm;
