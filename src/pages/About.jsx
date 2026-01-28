import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './Register.css';

const About = () => {
  return (
    <>
      <NavBar />
      <div className="auth-wrapper" style={{ paddingTop: '80px' }}>
        <div className="auth-card" style={{ width: '800px', maxWidth: '90vw' }}>
          <div className="p-4">
            <h2 className="text-center mb-4 fw-bold">About Us</h2>
            
            <div className="mb-4">
              <h4 className="mb-3" style={{ color: '#c7d2fe' }}>Our Mission</h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                We provide real-time cryptocurrency monitoring and smart alert systems to help traders and investors 
                make informed decisions in the volatile crypto market. Our platform combines cutting-edge technology 
                with user-friendly interfaces to deliver enterprise-grade monitoring solutions.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="mb-3" style={{ color: '#c7d2fe' }}>Key Features</h4>
              <ul style={{ color: '#94a3b8', lineHeight: '1.8' }}>
                <li>Real-time price monitoring for 100+ cryptocurrencies</li>
                <li>Customizable price alerts via email and SMS</li>
                <li>Advanced charting and technical analysis tools</li>
                <li>Portfolio tracking and performance analytics</li>
                <li>Market trend analysis and insights</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="mb-3" style={{ color: '#c7d2fe' }}>Our Technology</h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                Built with React.js frontend and ASP.NET Core backend, our platform integrates with leading 
                cryptocurrency APIs to provide accurate, real-time data. We use enterprise-grade security 
                measures to protect user data and ensure reliable service availability.
              </p>
            </div>

            <div className="text-center mt-4">
              <a href="/contact" className="text-decoration-none" style={{ color: '#93c5fd' }}>
                Get in touch with us →
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;