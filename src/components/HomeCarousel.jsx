import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomeCarousel.css';
import heroFutureBg from '../assets/hero-future-bg.png';

const HomeCarousel = () => {
    const navigate = useNavigate();

    return (
        <div className="hero-carousel-wrapper">
            <Carousel controls={false} indicators={true} interval={5000} fade className="hero-carousel">

                {/* Slide 1: Main Hero Message */}
                <Carousel.Item>
                    <div
                        className="carousel-slide hero-slide"
                        style={{ backgroundImage: `url(${heroFutureBg})` }}
                    >
                        <div className="hero-overlay"></div>
                        <div className="carousel-content container">
                            <div className="hero-text-section">
                                <h1 className="animate-slide-left delay-100">
                                    Real-Time Crypto Monitoring <br />
                                    <span className="highlight-text">& Smart Alerts</span>
                                </h1>
                                <p className="animate-slide-left delay-300">
                                    Advanced platform built with enterprise-grade tools for serious traders.
                                </p>
                                <div className="hero-actions animate-slide-up delay-500">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="action-btn glow-btn"
                                        onClick={() => navigate('/login')}
                                    >
                                        Get Started
                                    </Button>
                                    <Button
                                        variant="outline-light"
                                        size="lg"
                                        className="action-btn glass-btn"
                                        onClick={() => {
                                            const marketSection = document.querySelector('.market-section');
                                            if (marketSection) marketSection.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        Explore Market
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>

                {/* Slide 2: Analytics Feature */}
                <Carousel.Item>
                    <div
                        className="carousel-slide hero-slide"
                        style={{ backgroundImage: `url(${heroFutureBg})` }} // Reuse bg or usage provided one
                    >
                        <div className="hero-overlay"></div>
                        <div className="carousel-content container">
                            <div className="hero-text-section">
                                <h1 className="animate-slide-left">
                                    Deep Market <br />
                                    <span className="highlight-text">Analytics</span>
                                </h1>
                                <p className="animate-slide-left delay-200">
                                    Visualize trends, track volatility, and make data-driven decisions.
                                </p>
                                <div className="hero-actions animate-slide-up delay-400">
                                    <Button
                                        variant="info"
                                        size="lg"
                                        className="action-btn glow-btn"
                                        onClick={() => navigate('/market')}
                                    >
                                        View Charts
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>

                {/* Slide 3: Paper Trading */}
                <Carousel.Item>
                    <div
                        className="carousel-slide hero-slide"
                        style={{ backgroundImage: `url(${heroFutureBg})` }}
                    >
                        <div className="hero-overlay"></div>
                        <div className="carousel-content container">
                            <div className="hero-text-section">
                                <h1 className="animate-slide-left">
                                    Risk-Free <br />
                                    <span className="highlight-text">Portfolio Simulation</span>
                                </h1>
                                <p className="animate-slide-left delay-200">
                                    Master your strategy with virtual currency before investing real assets.
                                </p>
                                <div className="hero-actions animate-slide-up delay-400">
                                    <Button
                                        variant="success"
                                        size="lg"
                                        className="action-btn glow-btn"
                                        onClick={() => navigate('/paper-trading/dashboard')}
                                    >
                                        Start Simulation
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>

            </Carousel>
        </div>
    );
};

export default HomeCarousel;
