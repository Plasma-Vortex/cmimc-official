import React from "react";
import { Provider } from "react-redux";

import App from "./app";
import configureStore from "../configureStore";
import { initInfo } from "../actions";

const store = configureStore();

initInfo()(store.dispatch);

const Root = () => (
  <Provider store={ store }>
    <App />
  </Provider>
);

export default Root;
