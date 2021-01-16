import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card } from "react-materialize";
import { connect } from "react-redux";

import RegisterForm from "../../forms/register";
import News from "./news";

//@TODO spinner

/* blurb about cmimc */
const Blurb = ({ year, date }) => (
  <p style={{ marginBottom: "36px" }}>
    The Carnegie Mellon Informatics and Mathematics Competition (CMIMC) is an annual math and computer science competition held at <a href="http://www.cmu.edu/" target="_blank" className="red-text text-darken-2">Carnegie Mellon University</a> by CMU students. CMIMC { year } will be held <em>online</em> at <a href="https://cmimconline.org"</a> on { date }.
  </p>
);

const Introduction = ({ infoData: { requestStatus, message, content: info } }) => {
  if (!info) return <div />;
  return (
    <div className="section white">
      <Row className="container">
        <Col l={6} s={12}>
          <h4 className="header">Welcome, mathletes!</h4>
          <Blurb
            year={ info.year || "N/A" }
            date={ info.dates.contest_date || "N/A" } />
          <News />
        </Col>
        <Col offset="l1" l={5} s={12}>
          <Card>
            <h4>Sign Up</h4>
            <RegisterForm />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

Introduction.propTypes = {
  infoData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  infoData: state.init.info
});

export default connect(mapStateToProps)(Introduction);
