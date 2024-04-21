import React, { useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupForm = () => {
    // Define state variables for form inputs, loading state, and error handling
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [state, setState] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    // Define handleSubmit function to handle form submission
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signup({ firstName, lastName, state, email, password });
            // Reset form fields after successful signup
            setFirstName('');
            setLastName('');
            setState('');
            setEmail('');
            setPassword('');
            setError('');
            setLoading(false);
              console.log('AJHSKJ')
        } catch (error) {
            setError((error as Error).message);
            setLoading(false);
        }
    };
    const signup = async (userData: { firstName: string; lastName: string; state: string; email: string; password: string; }) => {
        try {
            const response = await fetch('https://localhost:7142/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to signup');
            }
            console.log('Signup successful:', userData);
            return data;
        } catch (error) {
            throw new Error((error as Error).message || 'Failed to signup');
        }
    };

    //SignupForm component
    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#2d2d32', height: '100vh', padding: '0' }}>
            <Form onSubmit={handleSubmit} className="p-4 rounded shadow border border-white" style={{ maxWidth: '800px', width: '100%', color: '#f9f9f9' }}>
                <h2 className="text-center mb-4">
                    <span> Sign Up </span>
                </h2>
                {/* Form fields for first name, last name, state, email, and password */}
                <Form.Group controlId="formFirstName" className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="py-2 px-3 border border-white rounded" />
                </Form.Group>

                <Form.Group controlId="formLastName" className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="py-2 px-3 border border-white rounded" />
                </Form.Group>

                <Form.Group controlId="formState" className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="py-2 px-3 border border-white rounded" />
                </Form.Group>

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
                        className="py-2 px-3 border border-white rounded" />
                </Form.Group>

                {/* Display error message if there is an error */}
                {error && <div className="text-danger mb-3">{error}</div>}

                {/* Button to submit the form */}
                <Button variant="secondary" type="submit" disabled={loading} className="py-2 login-btn">
                    {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
                </Button>
            </Form>
        </Container>
    );
};

export default SignupForm;
