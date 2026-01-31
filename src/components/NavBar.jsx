import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';


import logo from '../assets/coinsaarthi_logo.png';

const NavBar = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top" style={{ zIndex: 1000 }}>
            <Container fluid>
                <Navbar.Brand href="/dashboard" className="d-flex align-items-center">
                    <img
                        src={logo}
                        alt="COINSaarthi Logo"
                        height="120"
                        className="d-inline-block align-top me-2"
                        style={{ width: 'auto', objectFit: 'contain', maxHeight: '140px' }}
                    />
                    <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>COINSaarthi</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {user && (
                            <>
                                <Nav.Link href="/dashboard">Watchlist</Nav.Link>
                                <Nav.Link href="/subscription">Upgrade Plan</Nav.Link>
                            </>
                        )}
                        <Nav.Link href="/about">About Us</Nav.Link>
                        <Nav.Link href="/contact">Contact Us</Nav.Link>
                    </Nav>
                    <Nav>
                        {user ? (
                            <div className="d-flex align-items-center">
                                <span className="text-light me-3">Welcome, {user.userName}</span>

                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </div>
                        ) : (
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
