/*import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Spinner } from 'react-bootstrap';

export const EventForm = () => {
    const [organisation, setOrganisation] = useState('');
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [state, setState] = useState('');
    const [location, setLocation] = useState('');
    const [starttime, setStarttime] = useState('');
    const [endtime, setEndtime] = useState('');
    const [capacity, setCapacity] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState<string>(''); // Define the type of 'error' as string

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('https://localhost:7142/api/events', {
                organisation,
                title,
                description,
                state,
                location,
                starttime,
                endtime,
                capacity,
                image,
            });
            const data = response.data;
            const [error, setError] = useState<string>('');

            if (response.status === 200) {
                console.log("Event added successfully");
            } else {
                setError(data.message || 'Failed to add event');
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'An error occurred. Please try again later.');
        }

        setLoading(false);
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#2d2d32', height: '100vh', padding: '0' }}>
            <Form onSubmit={handleSubmit} className="p-4 rounded shadow border border-white" style={{ maxWidth: '800px', width: '100%', color: '#f9f9f9' }}>
                <h2 className="text-center mb-4">
                    <span> Add Event </span>
                </h2>
                <Form.Group controlId="formOrganisation" className="mb-3">
                    <Form.Label>Organisation:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Organisation"
                        value={organisation}
                        onChange={(e) => setOrganisation(e.target.value)}
                        className="py-2 px-3 border border-white rounded" />
                </Form.Group>

                <Form.Group controlId="formTitle" className="mb-3">
                    <Form.Label>Event name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Event name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="py-2 px-3 border border-white rounded" />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="py-2 px-3 border border-white rounded" />
                </Form.Group>

                {error && <div className="text-danger mb-3">{error}</div>}

                <Button variant="secondary" type="submit" disabled={loading} className="py-2 login-btn">
                    {loading ? <Spinner animation="border" size="sm" /> : 'Post event'}
                </Button>
            </Form>
        </Container>
    );
};

export default EventForm;
*/