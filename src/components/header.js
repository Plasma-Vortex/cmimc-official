import React from "react";
import { Modal, Navbar, NavItem, Icon, SideNav, SideNavItem, Button } from "react-materialize";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../actions";
import LoginForm from "./forms/login";
import M from "materialize-css";

class Header extends React.Component {
  login = sidenav => (
	sidenav ? (
	  <Button href="/login" node="a" waves="light" className="red darken-2">
		Log In
	  </Button>
	) : (
      <Link to="/login" className="waves-effect waves-light btn red darken-2">
        Log In
      </Link>
	)
  )

  logout = (sidenav) => {
    const { logout } = this.props;
    return (
	  sidenav ? (
		<Button href="/" node="a" waves="light" className="red darken-2" onClick={ logout }>
		  Log Out
		</Button>
	  ) : (
        <Link
          to="/"
          className="waves-effect waves-light btn red darken-2 sidenav-close" 
          onClick={ logout }>
          Log Out
        </Link>
	  )
    );
  }

  render() {
    const { authData: { requestStatus, message, content: auth } } = this.props;
    return (
      <header>
        <div className="navbar-fixed hide-on-med-and-down">
          <nav className="z-depth-0">
            <div className="nav-wrapper container">
              <Link to="/" className="brand-logo">
                <img src="assets/img/cmimc-logo-huge.png" height="28px" />
              </Link>
			  <a href="#" data-activates="mobile-sidenav" class="button-collapse sidenav-trigger hide-on-large-only" style={{ color: "black", position: "fixed", zIndex: 997 }}><i class="material-icons">menu</i></a>
              <ul className="right">
                <li><Link to="/" className="grey-text text-darken-3">Home</Link></li>
                <li><Link to="/info" className="grey-text text-darken-3">Information</Link></li>
                <li><a href="/archive" className="grey-text text-darken-3">Archive</a></li>
                <li><Link to="/staff" className="grey-text text-darken-3">Staff</Link></li>
                { auth && <li><Link to="/account" className="grey-text text-darken-3">Account</Link></li> }
                <li>{ auth ? this.logout(false) : this.login(false) }</li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="navbar-fixed hide-on-large-only">
          <nav className="z-depth-0">
            <div className="nav-wrapper container">
              <Link to="/" className="brand-logo">
                <img src="assets/img/cmimc-logo-huge.png" height="28px" />
              </Link>
			</div>
          </nav>
        </div>

		<div className="container hide-on-large-only">
		  <SideNav
			id="mobile-sidenav"
			options={{
			  draggable: true
			}}
			trigger={<a href="#" style={{ color: "black", position: "fixed", "top": "0px", zIndex: 997 }}><i className="material-icons hamburger-menu">menu</i></a>}
			style={{ width: "250px" }}
		  >
			<SideNavItem href="/" waves style={{ paddingTop: "16px" }}>
			  Home
			</SideNavItem>
			<SideNavItem href="/info" waves>
			  Information
			</SideNavItem>
			<SideNavItem href="/archive" waves>
			  Archive
			</SideNavItem>
			<SideNavItem href="/staff" waves>
			  Staff
			</SideNavItem>
            { auth &&
			<SideNavItem href="/account" waves>
				Account
			</SideNavItem>
			}
        	<li>{ auth ? this.logout(true) : this.login(true) }</li>
		  </SideNav>
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
