import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventFooter from '../components/Footer';
import EventNavbar from '../components/Navbar';

function Contact() {
  const [emailSent, setEmailSent] = useState(false); // State variable to track if email is sent

  // Function to send email
  const sendEmail = (e: React.FormEvent<HTMLFormElement>, fromName: string, fromEmail: string) => {
    e.preventDefault();

// Extracting form input values
    const name = e.currentTarget.name.valueOf;
    const email = e.currentTarget.email.value;
    const message = e.currentTarget.message.value;

    // form validation
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

 // Creating template parameters for email
    const templateParams = {
      to_name: 'EventPlanner', 
      message: message,
      from_name: fromName,
      reply_to: fromEmail, 
    };

// Sending email using emailjs
    emailjs.send('service_y8guhja', 'template_w6smfrr', templateParams, 'o1xUFxfK5bnPiRW0G')
      .then((result) => {
        console.log(result.text);
        setEmailSent(true); // Set emailSent state to true after successful email sending 
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Oops! Something went wrong. Please try again later.');
      });
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-between p-0" style={{ minHeight: '100vh', backgroundColor: '#2d2d32', color: 'white' }}>
      <EventNavbar/>
      <div className="container py-5">
        <h1 className="mb-5 text-center">Contact Us!</h1>
        <div className="row justify-content-center align-items-start">
          <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
            <Stack gap={3}>
              <div className="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                </svg>  +38344439939
              </div>
              <div className="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                </svg> Email
              </div>
              <div className="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8z"/>
                  <path fillRule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
                </svg> Location 
              </div>
            </Stack>
          </div>
          <div className="col-md-1 d-none d-md-flex align-items-center justify-content-center" style={{ borderLeft: '1px solid white', minHeight: '50vh' }}></div>
          <div className="col-md-4">
            <Form className="p-4" onSubmit={(e) => sendEmail(e, (e.currentTarget.name as unknown as HTMLInputElement).value, (e.currentTarget.email as HTMLInputElement).value)}>
              <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Your Name" name="name" />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" name="email" />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} name="message" />
              </Form.Group>
              <div className="text-center">
                <Button variant="secondary" type="submit">Send</Button>
                {emailSent && <p>Email sent successfully!</p>}
              </div>
            </Form>
          </div>
        </div>
      </div>
      <EventFooter/>
    </div>
  );
}

export default Contact;
