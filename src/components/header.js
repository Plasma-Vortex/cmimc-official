import React from "react";
import { Modal } from "react-materialize";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../actions";
import LoginForm from "./forms/login";

class Header extends React.Component {
  login = () => (
    <Link to="/login" className="waves-effect waves-light btn red darken-2">
      Log In
    </Link>
  )

  logout = () => {
    const { logout } = this.props;
    return (
      <Link
        to="/"
        className="waves-effect waves-light btn red darken-2" 
        onClick={ logout }>
        Log Out
      </Link>
    );
  }

  render() {
    const { authData: { requestStatus, message, content: auth } } = this.props;
    return (
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
                { auth && <li><Link to="/account" className="grey-text text-darken-3">Account</Link></li> }
                <li>{ auth ? this.logout() : this.login() }</li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
        authData: state.auth.authenticated
      }),
      mapDispatchToProps = dispatch => ({
        logout: () => { logout()(dispatch); }
      });

export default connect(mapStateToProps, mapDispatchToProps)(Header);
