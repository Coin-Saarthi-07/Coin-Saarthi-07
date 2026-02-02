import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import './Register.css';



// Import team images
import member1 from '../assets/team/member1.jpg';
import member2 from '../assets/team/member2.jpg';
import member3 from '../assets/team/member3.png';
import member4 from '../assets/team/member4.jpg';
import member5 from '../assets/team/member5.jpg';

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const teamMembers = [
    { id: 2, image: member2, name: "Shraddha Hade", role: "Project Lead" },
    { id: 3, image: member3, name: "Hanuman Jadhav", role: "Developer" },
    { id: 1, image: member1, name: "Nandini Wahane", role: "Developer" },
    { id: 4, image: member4, name: "Prasad Talekar", role: "Developer" },
    { id: 5, image: member5, name: "Shreya Raj", role: "Developer" },
  ];

  return (
    <>
      <NavBar />
      <div className="auth-wrapper" style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '50px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

          <div className="row g-5">
            <div className="col-lg-6">
              <div className="h-100" style={{ maxWidth: '100%' }}>
                <div className="py-4">
                  <h2 className="mb-4 fw-bold text-center" style={{ color: '#fff' }}>Our Team</h2>
                  <div className="row g-4 justify-content-center">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="col-md-6 col-lg-6">
                        <div className="text-center p-3 rounded" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                          <div style={{
                            width: '100px',
                            height: '100px',
                            margin: '0 auto 15px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '3px solid #c7d2fe'
                          }}>
                            <img
                              src={member.image}
                              alt={member.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                          <h5 className="mb-1" style={{ color: '#fff' }}>{member.name}</h5>
                          <p className="small mb-0" style={{ color: '#94a3b8' }}>{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Left Column: About Info */}
            <div className="col-lg-6">
              <div className="h-100" style={{ maxWidth: '100%' }}>
                <div className="py-4">
                  <h2 className="mb-4 fw-bold" style={{ color: '#fff' }}>About Us</h2>

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

            {/* Right Column: Team Section */}
            {/* <div className="col-lg-6">
              <div className="h-100" style={{ maxWidth: '100%' }}>
                <div className="py-4">
                  <h2 className="mb-4 fw-bold text-center" style={{ color: '#fff' }}>Our Team</h2>
                  <div className="row g-4 justify-content-center">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="col-md-6 col-lg-6">
                        <div className="text-center p-3 rounded" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                          <div style={{
                            width: '100px',
                            height: '100px',
                            margin: '0 auto 15px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '3px solid #c7d2fe'
                          }}>
                            <img
                              src={member.image}
                              alt={member.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                          <h5 className="mb-1" style={{ color: '#fff' }}>{member.name}</h5>
                          <p className="small mb-0" style={{ color: '#94a3b8' }}>{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;