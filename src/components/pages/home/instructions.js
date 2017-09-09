import React from "react";
import { Row, Col } from "react-materialize";

const instructions = [
  {
    title: "Form a Team",
    img: "assets/img/users.png",
    description: "Form a team of 4-6 students. Make sure you have a diverse set of skills to cover the team and power round."
  },
  {
    title: "Register Online",
    img: "assets/img/computer.png",
    description: "Register your team by logging in. Be sure to keep track of all important deadlines and dates."
  },
  {
    title: "Travel to CMU",
    img: "assets/img/plane.png",
    description: "After receiving the confirmation email for your registration, book travel to Carnegie Mellon University."
  }
];

const Instructions = () => (
  <div className="section blue-grey lighten-4">
    <Row className="container center-align">
      <h4>How to Participate</h4>
      {
        instructions.map(({ img, title, description }, key) => (
          <Col l={4} s={12} key={key}>
            <img src={ img } height="150px" />
            <h5>{ title }</h5>
            <p>{ description }</p>
          </Col>
        ))
      }
    </Row>
  </div>
);

export default Instructions;
