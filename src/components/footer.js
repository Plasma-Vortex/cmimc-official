import React from "react";
import { Row, Col } from "react-materialize";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="page-footer blue-grey lighten-2">
    <div className="container">
      <Row>
        <Col l={3} s={12}>
          <img src="assets/img/cmimc-logo-huge-white.png" className="footer-logo" height="36px" />
        </Col>
        <Col offset="l1" l={3} s={12}>
          <h5 className="grey-text text-lighten-4">Information</h5>
          <ul>
            <li><Link to="/" className="grey-text text-lighten-3">Rules</Link></li>
            <li><Link to="/faq" className="grey-text text-lighten-3">FAQ</Link></li>
          </ul>
        </Col>
        <Col l={3} s={12}>
          <h5 className="grey-text text-lighten-4">Contact</h5>
          <ul>
            <li><a className="grey-text text-lighten-3">Email</a></li>
            <li><a href="https://www.facebook.com/CMIMC" target="_blank" className="grey-text text-lighten-3">Facebook</a></li>
          </ul>
        </Col>
      </Row>
    </div>
    <div className="footer-copyright blue-grey lighten-1">
      <div className="container">
        <ul className="grey-text text-lighten-3">
          <li>&copy; 2017 CMIMC</li>
          <li><Link to="/terms" className="grey-text text-lighten-3">Terms</Link></li>
          <li><Link to="/privacy" className="grey-text text-lighten-3">Privacy</Link></li>
          <li><a className="grey-text text-lighten-3">ctj@math.cmu.edu</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
