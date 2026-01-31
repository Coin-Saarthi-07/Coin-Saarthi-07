import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './Register.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <NavBar />
      <div className="auth-wrapper" style={{ paddingTop: '80px' }}>
        <div className="auth-card" style={{ width: '600px', maxWidth: '90vw' }}>
          <div className="p-4">
            <h2 className="text-center mb-4 fw-bold">Contact Us</h2>
            
            {success && <Alert variant="success">{success}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  required
                />
              </Form.Group>
              
              <Button variant="primary" type="submit" className="w-100 mt-2">
                Send Message
              </Button>
            </Form>

            
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;