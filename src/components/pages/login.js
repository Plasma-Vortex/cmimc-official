import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col, Input, Button, Card } from "react-materialize";

import LoginForm from "../forms/login";

const Login = () => (
  <Row className="container">
    <Col l={6} s={12} offset={"l3"} style={{marginTop: "24px"}}>
      <Card>
        <h4 className="teal-text text-darken-4">Log In</h4>
        <LoginForm />
      </Card>
    </Col>
  </Row>
);

export default Login;
