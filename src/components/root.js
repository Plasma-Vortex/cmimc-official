import React from "react";
import { Provider } from "react-redux";

import App from "./app";
import configureStore from "../configureStore";
import { initInfo } from "../actions";
import { AUTH_USER } from "../actions/types";
import { payload } from "../actions/utilities";
import auth from "../auth";

const store = configureStore();

if (auth.isLoggedIn()) {
  store.dispatch(Object.assign({ type: AUTH_USER }, payload.success({ 
    content: true 
  })));
}
initInfo()(store.dispatch);

const Root = () => (
  <Provider store={ store }>
    <App />
  </Provider>
);

export default Root;
