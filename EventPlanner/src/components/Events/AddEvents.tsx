import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import { Container, Form, Button } from "react-bootstrap";
import countries from "i18n-iso-countries";
import englishLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(englishLocale);
const countryCodes = countries.getNames("en");

// Convert country codes object into an array of { code: string, name: string }
const countryOptions = Object.keys(countryCodes).map((code) => ({
  code,
  name: countryCodes[code],
}));
interface EventForm {
  organization: string;
  title: string;
  description: string;
  state: string;
  location: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  categoryId: number;
  imageFile?: File;
}

const CreateEventComponent: React.FC = () => {
  const { data: categories, isLoading, error } = useCategories();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EventForm>({
    organization: "",
    title: "",
    description: "",
    state: "",
    location: "",
    startTime: "",
    endTime: "",
    maxCapacity: 0,
    categoryId: 0,
  });
  type FormControlElement =
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement;
  const handleChange = (e: React.ChangeEvent<FormControlElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handles file input changes specifically
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };

  const formatDateTime = (isoString: string) => {
    const dateTime = new Date(isoString);
    const timeZoneOffset = -dateTime.getTimezoneOffset() / 60;
    const formattedDate = dateTime.toISOString().replace("Z", "");
    const timeZone = `${timeZoneOffset >= 0 ? "+" : "-"}${Math.abs(
      timeZoneOffset
    )
      .toString()
      .padStart(2, "0")}:00`;
    return `${formattedDate}${timeZone}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "startTime" || key === "endTime") {
        data.append(key, formatDateTime(value));
      } else if (value instanceof File) {
        data.append(key, value, value.name);
      } else if (value != null) {
        data.append(key, value.toString());
      }
    });

    if (formData.imageFile instanceof File) {
      data.append("imageFile", formData.imageFile, formData.imageFile.name);
    }

    const bearerToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    try {
      const response = await axios.post(
        "https://localhost:7142/api/events",
        data,
        config
      );
      console.log("Event created:", response.data);
      navigate("/profile");
      // Handle further logic after event creation (e.g., redirect, display message)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "Error creating event:",
        error.response?.data || error.message
      );
    }
  };
  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories!</div>;
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#2d2d32", height: "100vh", padding: "0" }}
    >
      <Form
        onSubmit={handleSubmit}
        className="p-4 rounded shadow border border-white"
        style={{ maxWidth: "800px", width: "100%", color: "#f9f9f9" }}
      >
        <h2 className="text-center mb-4">
          <span>Create Event</span>
        </h2>
        <Form.Group controlId="formOrganization" className="mb-3">
          <Form.Label>Organization</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className="py-2 px-3 border border-white rounded"
            required
          />
        </Form.Group>

        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="py-2 px-3 border border-white rounded"
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="py-2 px-3 border border-white rounded"
          />
        </Form.Group>

        <Form.Group controlId="formState" className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="py-2 px-3 border border-white rounded"
            required
          >
            <option value="">Select a country</option>
            {countryOptions.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {/* Other form fields */}

        <Form.Group controlId="formLocation" className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="py-2 px-3 border border-white rounded"
            required
          />
        </Form.Group>

        <Form.Group controlId="formStartTime" className="mb-3">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="py-2 px-3 border border-white rounded"
            required
          />
        </Form.Group>

        <Form.Group controlId="formEndTime" className="mb-3">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="py-2 px-3 border border-white rounded"
            required
          />
        </Form.Group>

        <Form.Group controlId="formMaxCapacity" className="mb-3">
          <Form.Label>Max Capacity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter max capacity"
            name="maxCapacity"
            value={formData.maxCapacity}
            onChange={handleChange}
            className="py-2 px-3 border border-white rounded"
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategory" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="py-2 px-3 border border-white rounded"
            required
          >
            <option value="">Select a category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formImage" className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="imageFile"
            onChange={handleImageChange}
          />
        </Form.Group>
        <Button
          type="submit"
          className="py-2 login-btn"
          style={{
            background:
              "linear-gradient(111.3deg, rgb(74, 105, 187) 9.6%, rgb(205, 77, 204) 93.6%)",
            border: "none",
          }}
        >
          Create Event
        </Button>
      </Form>
    </Container>
  );
};

export default CreateEventComponent;
