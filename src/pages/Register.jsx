import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import authService from '../services/authService';
import './Register.css'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNo: '',
        password: '',
        dob: ''
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear specific field error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    };

    const validateForm = () => {
        const newErrors = {};

        // Username validation
        if (!formData.username) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 6) {
            newErrors.username = 'Must contain minimum 6 characters';
        } else if (formData.username.length > 50) {
            newErrors.username = 'Maximum 50 characters allowed';
        } else if (!/^(?=.*[A-Z])[A-Za-z0-9_@]+$/.test(formData.username)) {
            newErrors.username = 'Username must contain at least one capital letter and may include letters, numbers, _ ,@ only.';
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (formData.email.length > 100) {
            newErrors.email = 'Maximum 100 characters allowed';
        } else if (!/^[a-zA-Z][a-zA-Z0-9]*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            newErrors.email = 'Email must start with a letter and may contain numbers';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Must contain minimum 8 characters';
        } else if (formData.password.length > 15) {
            newErrors.password = 'Only 15 characters allowed';
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(formData.password)) {
            newErrors.password = 'Must contain at least one capital letter, one number, and one special character.';
        }

        // Phone validation
        if (!formData.phoneNo) {
            newErrors.phoneNo = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.phoneNo)) {
            newErrors.phoneNo = 'Enter valid 10 digit Indian mobile number';
        }

        // DOB validation
        if (!formData.dob) {
            newErrors.dob = 'Date of birth is required';
        } else {
            const age = validateAge(formData.dob);
            if (age < 18) {
                newErrors.dob = 'You must be at least 18 years old';
            } else if (age > 120) {
                newErrors.dob = 'Please enter a valid date of birth';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            await authService.register({
                userName: formData.username,   // 🔥 IMPORTANT
                email: formData.email,
                phoneNo: formData.phoneNo,
                password: formData.password,
                dob: formData.dob
            });


            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 1500);

        } catch (err) {
            const msg =
                err.response?.data?.message ||
                err.response?.data ||
                err.message ||
                "Registration failed";
            setError(msg);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar />
            <div className="auth-wrapper">
                <Card className="auth-card" style={{ width: '450px' }}>
                    <Card.Body className="p-4">
                        <h2 className="text-center mb-4 fw-bold">Register</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter username"
                                    isInvalid={!!errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Phone No.</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phoneNo"
                                    value={formData.phoneNo}
                                    onChange={handleChange}
                                    placeholder="Enter 10 digit mobile number"
                                    maxLength="10"
                                    isInvalid={!!errors.phoneNo}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phoneNo}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    isInvalid={!!errors.dob}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.dob}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 mt-2" disabled={loading}>
                                {loading ? 'Registering...' : 'Register'}
                            </Button>
                        </Form>
                        <div className="text-center mt-3">
                            Already have an account? <a href="/login" className="text-decoration-none">Login</a>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};

export default Register;
