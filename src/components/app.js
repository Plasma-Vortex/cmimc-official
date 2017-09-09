import React from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./header";
import Routes from "./routes";
import Footer from "./footer";

const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Routes />
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
