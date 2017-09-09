import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => (
  <div>
    <h4>401 Unauthorized Access</h4>
    <p>Please login or sign up <Link to="/">here.</Link></p>
  </div>
);

export default Unauthorized;
