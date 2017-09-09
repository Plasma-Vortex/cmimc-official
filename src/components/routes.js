import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, withRouter } from "react-router-dom";

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

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Pages.Home } />
    <Route exact path="/info" component={ inContainer(Pages.Info) } />
    <Route exact path="/archive" component={ inContainer(Pages.Archive) } />
    <Route exact path="/staff" component={ inContainer(Pages.Staff) } />
    <Route exact path="/faq" component={ inContainer(Pages.Faq) } />
    <Route exact path="/privacy" component={ inContainer(Pages.Privacy) } />
    <Route exact path="/terms" component={ inContainer(Pages.Terms) } />
    <Route path="*" component={ inContainer(Pages.NotFound) } />
  </Switch>
);

export default Routes;
