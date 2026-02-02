import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import authService from '../services/authService';
import './Register.css';


const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        await authService.login({ userName: username, password });

        const user = authService.getCurrentUser();

        // 🚫 BLOCKED USER HANDLING (frontend-only)
        if (user?.status === "BLOCKED") {
            authService.logout(); // ⛔ remove token immediately
            setError("Your account has been blocked. Please contact the administrator.");
            setLoading(false);
            return;
        }

        if (user?.role === "ADMIN") {
            navigate("/admin/dashboard");
        } else {
            navigate("/dashboard");
        }

    } catch (err) {
        setError(
            err.response?.data?.message ||
            err.message ||
            "Login failed. Please check your credentials."
        );
    } finally {
        setLoading(false);
    }
};



    return (
        <>
            <NavBar />
            <div className="auth-wrapper">
                <Card className="auth-card" style={{ width: '400px' }}>
                    <Card.Body className="p-4">
                        <h2 className="text-center mb-4 fw-bold">Login</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Enter username"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 mt-2" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </Form>
                        <div className="text-center mt-3">
                            Don't have an account? <a href="/register" className="text-decoration-none">Register</a>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};

export default Login;
