import React from "react";
import { Modal } from "react-materialize";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import LoginForm from "./forms/login";

const LoginModal = () => (
  <Modal 
    header="Log In"
    trigger={
      <a className='waves-effect waves-light btn red darken-2'>Log In</a>
    }>
    <LoginForm />
  </Modal>
);

const Logout = () => (
  <a className='waves-effect waves-light btn red darken-2'>Log Out</a>
);


const Header = ({ authData: { requestStatus, message, content: auth } }) => (
  <header>
    <div className="navbar-fixed">
      <nav className="z-depth-0">
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo">
            <img src="assets/img/cmimc-logo-huge.png" height="28px" />
          </Link>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/" className="grey-text text-darken-3">Home</Link></li>
            <li><Link to="/info" className="grey-text text-darken-3">Information</Link></li>
            <li><Link to="/archive" className="grey-text text-darken-3">Archive</Link></li>
            <li><Link to="/staff" className="grey-text text-darken-3">Staff</Link></li>
            <li>{ auth ? <Logout /> : <LoginModal /> }</li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
);

const mapStateToProps = state => ({
  authData: state.auth.authenticated
});

export default connect(mapStateToProps)(Header);
