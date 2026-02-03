import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-top">
          <Col md={4}>
            <h5 className="footer-title">COINSaarthi</h5>
            <p className="footer-text">
              Track markets. Manage risk. Trade smarter.<br />
              Real-time crypto monitoring and smart alerts platform built for
              traders and investors.
            </p>
          </Col>

          <Col md={2}>
            <h6 className="footer-heading">Platform</h6>
            <ul className="footer-links">
              <li>Real-Time Alerts</li>
              <li>Watchlist</li>
              <li>Paper Trading</li>
              <li>Portfolio</li>
            </ul>
          </Col>

          <Col md={2}>
            <h6 className="footer-heading">Resources</h6>
            <ul className="footer-links">
              <li>Market Insights</li>
              <li>FAQs</li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="footer-heading">Company</h6>
            <ul className="footer-links">
              <li>About</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row className="footer-bottom">
          <Col className="text-center">
            <p className="footer-copy">
              © {new Date().getFullYear()} COINSaarthi. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
