import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as Pages from "./pages";

const inContainer = InsideContainer => {
  return props => (
    <div className="section white">
      <div className="container">
        <InsideContainer { ...props } />
      </div>
    </div>
  );
};

const requireAuth = Component => {
  const AuthComponent = ({ auth }) => auth ? <Component /> : <Pages.Unauthorized />;

  const mapStateToProps = state => ({
    auth: state.auth.authenticated.content
  });

  return connect(mapStateToProps)(AuthComponent);
}

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Pages.Home } />
    <Route exact path="/info" component={ inContainer(Pages.Info) } />
    <Route exact path="/archive" component={ inContainer(Pages.Archive) } />
    <Route exact path="/staff" component={ inContainer(Pages.Staff) } />
    <Route exact path="/account" component={ inContainer(requireAuth(Pages.Account)) } />
    <Route exact path="/password" component={ inContainer(requireAuth(Pages.Password)) } />
    <Route exact path="/login" component={ Pages.Login } />
    <Route exact path="/faq" component={ inContainer(Pages.Faq) } />
    <Route exact path="/privacy" component={ inContainer(Pages.Privacy) } />
    <Route exact path="/terms" component={ inContainer(Pages.Terms) } />
    <Route exact path="/admin" component={ inContainer(requireAuth(Pages.Admin)) } />
    <Route path="*" component={ inContainer(Pages.NotFound) } />
  </Switch>
);

export default Routes;
