import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-top">
          <Col md={4}>
            <h5 className="footer-title">CryptoAlert</h5>
            <p className="footer-text">
              Real-time crypto monitoring and smart alerts platform built for
              traders and investors.
            </p>
          </Col>

          <Col md={2}>
            <h6 className="footer-heading">Product</h6>
            <ul className="footer-links">
              <li>Features</li>
              <li>Pricing</li>
              <li>Dashboard</li>
            </ul>
          </Col>

          <Col md={2}>
            <h6 className="footer-heading">Company</h6>
            <ul className="footer-links">
              <li>About</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="footer-heading">Support</h6>
            <ul className="footer-links">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row className="footer-bottom">
          <Col className="text-center">
            <p className="footer-copy">
              © {new Date().getFullYear()} CryptoAlert. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
