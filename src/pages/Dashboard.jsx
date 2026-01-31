import { Container, Row, Col, Card } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import authService from '../services/authService';

const Dashboard = () => {
    const user = authService.getCurrentUser();

    return (
        <>
            <NavBar />
            <Container className="dashboard-container fade-in">
                <h2 className="dashboard-welcome text-center">Welcome back, {user?.username}</h2>
                <Row className="g-4">
                    <Col md={4}>
                        <Card className="feature-card watch-card h-100">
                            <Card.Header>Watchlist</Card.Header>
                            <Card.Body>
                                <Card.Title>My Watchlist</Card.Title>
                                <Card.Text>
                                    Track your favorite crypto assets in real-time.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="feature-card alert-card h-100">
                            <Card.Header>Alerts</Card.Header>
                            <Card.Body>
                                <Card.Title>Active Alerts</Card.Title>
                                <Card.Text>
                                    Manage your price alerts and get notified instantly.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="feature-card sub-card h-100">
                            <Card.Header>Subscription</Card.Header>
                            <Card.Body>
                                <Card.Title>Plan Details</Card.Title>
                                <Card.Text>
                                    Current Plan: <span className="badge bg-light text-dark">Free Tier</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Dashboard;
