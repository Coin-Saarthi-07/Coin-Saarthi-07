import { Navbar, Nav, Container, Button, Dropdown, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import authService from '../services/authService';
import { getUserNotifications } from '../services/notificationService';



import logo from '../assets/coinsaarthi_logo_circular.png';

const NavBar = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const user = authService.getCurrentUser();

    const fetchNotifications = async () => {
        if (user && user.userId) {
            try {
                const res = await getUserNotifications(user.userId);
                console.log("NavBar notifications received:", res.data);
                setNotifications(res.data);
                // Filter notifications with 'Sent' status (meaning they haven't been 'Read' yet by the user in the UI)
                // Note: The backend uses 'Sent' as initial status.
                setUnreadCount(res.data.filter(n => n.status === 'Sent' || n.status === 'Pending').length);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
        return () => clearInterval(interval);
    }, [user?.userId]);

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
                        height="60"
                        className="d-inline-block align-top me-3"
                        style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'contain',
                            borderRadius: '50%',
                            background: 'transparent'
                        }}
                    />

                    <span style={{ fontSize: '1.8rem', fontWeight: 'bold', letterSpacing: '1px' }}>COINSaarthi</span>
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
                                {/* Notification Bell */}
                                <Dropdown align="end" className="me-3">
                                    <Dropdown.Toggle as="div" style={{ cursor: 'pointer', position: 'relative' }}>
                                        <FaBell size={24} color="white" />
                                        {unreadCount > 0 && (
                                            <Badge
                                                pill
                                                bg="danger"
                                                style={{
                                                    position: 'absolute',
                                                    top: '-8px',
                                                    right: '-8px',
                                                    fontSize: '0.7rem'
                                                }}
                                            >
                                                {unreadCount}
                                            </Badge>
                                        )}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu
                                        style={{
                                            width: '320px',
                                            maxHeight: '400px',
                                            overflowY: 'auto',
                                            background: '#1e293b',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            padding: '0'
                                        }}
                                    >
                                        <div style={{
                                            padding: '12px 16px',
                                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <span>Notifications</span>
                                            {unreadCount > 0 && (
                                                <small style={{ color: '#60a5fa', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => setUnreadCount(0)}>Clear</small>
                                            )}
                                        </div>
                                        {notifications.length === 0 ? (
                                            <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
                                                No notifications yet
                                            </div>
                                        ) : (
                                            notifications.map((note, idx) => (
                                                <Dropdown.Item
                                                    key={idx}
                                                    className="notification-item"
                                                    style={{
                                                        whiteSpace: 'normal',
                                                        padding: '12px 16px',
                                                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                        color: '#cbd5e1',
                                                        background: note.status === 'Sent' ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                                                    }}
                                                >
                                                    <div style={{ fontSize: '14px', marginBottom: '4px' }}>{note.message}</div>
                                                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                                                        {new Date(note.sentAt).toLocaleString()}
                                                    </div>
                                                </Dropdown.Item>
                                            ))
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>

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
