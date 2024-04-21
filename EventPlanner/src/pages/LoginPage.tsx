import React, { useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        setError(''); // Clear any previous error messages
        setLoading(true); // Set loading state while processing request

        try {
            // Send a request to your backend server for authentication
            const response = await axios.post( 'https://localhost:7142/api/users/login', {
                email,
                password,
            });
            const data = response.data;

            if (response.status === 200) {
                // Authentication successful
                 console.log()
            } else {
                // Authentication failed
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            setError('An error occurred. Please try again later.');
        }

        setLoading(false); // Reset loading state after processing request
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#2d2d32', height: '100vh', padding: '0' }}>
            <Form onSubmit={handleSubmit} className="p-4 rounded shadow border border-white" style={{ maxWidth: '800px', width: '100%', color: '#f9f9f9' }}>
                <h2 className="text-center mb-4">
                    <span> Login </span>
                </h2>
                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-2 px-3 border border-white rounded" />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="py-2 px-3 border border-secondary rounded" />
                </Form.Group>

                <Form.Group controlId="formCheckbox" className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Remember Me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)} />
                </Form.Group>

                {error && <div className="text-danger mb-3">{error}</div>}

                <Button variant="secondary" type="submit" disabled={loading} className="py-2 login-btn">
                    {loading ? <Spinner animation="border" size="sm" /> : 'Log In'}
                </Button>
            </Form>
        </Container>
    );
};

export default LoginForm;
