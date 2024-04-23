import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from 'axios';

export const LoginForm = () => {
     // State variables for managing form inputs, loading, errors, and authentication status
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    
 // Function to handle form submission
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();// Prevent default form submission behavior
        setError('');// Clear any previous errors
        setLoading(true);// Set loading state to true

        try {
            const response = await axios.post('https://localhost:7142/api/users/login', {
                email,
                password,
            });
            const data = response.data;

            if (response.status === 200) {
                console.log("Success")
                const token = data.token; // Extract token from response data
                localStorage.setItem('token', token); 
                setIsLoggedIn(true);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }

        setLoading(false);
    };

    const redirectToSignup = () => {
        navigate("/signup");
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <Navbar />
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

                    <Button
                        type="submit"
                        disabled={loading}
                        className="py-2 login-btn"
                        style={{
                            background: 'linear-gradient(111.3deg, rgb(74, 105, 187) 9.6%, rgb(205, 77, 204) 93.6%)',
                            border: 'none',
                            margin: ' 10px'
                        }}
                    >
                        {loading ? <Spinner animation="border" size="sm" /> : 'Log In'}
                    </Button>
                    
                    <Button
                        onClick={redirectToSignup}
                        disabled={loading}
                        className="py-2 login-btn"
                        style={{
                            background: 'linear-gradient(111.3deg, rgb(74, 105, 187) 9.6%, rgb(205, 77, 204) 93.6%)',
                            border: 'none'
                        }}
                    >
                        {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
                    </Button>
                </Form>
            </Container>
            <Footer />
        </>
    );
};

export default LoginForm;
