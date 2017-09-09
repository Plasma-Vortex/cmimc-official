import React from "react";
import { Col } from "react-materialize";

const Spinner = () => (
  <div className="spinner">
    <i className="fa fa-spinner fa-spin fa-3x fa-fw" />
    <span className="sr-only">Loading...</span>
  </div>
);

const Error = ({ error, message }) => (
  !error ? <div /> : (
    <Col s={12} className="red-text text-darken-2">
      <p>{ message }</p>
    </Col>
  )
);

export { Spinner, Error };
