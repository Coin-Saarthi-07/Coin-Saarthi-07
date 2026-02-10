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
    { id: 2, image: member2, name: "Shraddha Hade", role: "Project Lead - Developer" },
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
                  <p className="mb-4" style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                    CryptoAlert is a smart cryptocurrency monitoring and trading analysis platform designed to help users track market movements, analyze trends, and make confident decisions in a fast-changing crypto environment.
                  </p>

                  <div className="mb-4">
                    <h4 className="mb-3" style={{ color: '#c7d2fe' }}>Our Mission</h4>
                    <ul style={{ color: '#94a3b8', lineHeight: '1.6', listStyleType: 'none', paddingLeft: 0 }}>
                      <li className="mb-2">✓ To provide real-time cryptocurrency monitoring with accurate and reliable market data</li>
                      <li className="mb-2">✓ To empower traders and investors with smart alerts for timely decision-making</li>
                      <li className="mb-2">✓ To combine advanced technology with a simple, user-friendly interface</li>
                      <li className="mb-2">✓ To support both learning-focused beginners and data-driven traders</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-3" style={{ color: '#c7d2fe' }}>Key Features</h4>
                    <ul style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                      <li>Real-time price monitoring for 100+ cryptocurrencies</li>
                      <li>Customizable price alerts delivered via Email and SMS</li>
                      <li>Advanced charting and technical analysis tools</li>
                      <li>Portfolio tracking with performance and profit/loss analytics</li>
                      <li>Market trend analysis and actionable insights</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-3" style={{ color: '#c7d2fe' }}>Our Technology</h4>
                    <ul style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                      <li><strong>React.js</strong> for a fast, responsive, and modern frontend experience</li>
                      <li><strong>ASP.NET Core</strong> backend for secure and scalable service handling</li>
                      <li>Integration with trusted cryptocurrency APIs for real-time and historical data</li>
                      <li>Enterprise-grade security to protect user data and transactions</li>
                      <li>High availability and reliability to ensure uninterrupted monitoring</li>
                    </ul>
                  </div>

                  <div className="text-center mt-5 mb-3">
                    <h5 style={{ color: '#93c5fd', fontStyle: 'italic' }}>
                      "CryptoAlert — Monitor smarter. Analyze deeper. Trade confidently."
                    </h5>
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
    </>
  );
};

export default About;
