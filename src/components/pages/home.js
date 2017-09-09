import React from "react";
import { Parallax } from "react-materialize";

import Introduction from "./home/introduction";
import Instructions from "./home/instructions";
import Sponsors from "./home/sponsors";

const Home = () => (
  <div>
    <Introduction />
    <Parallax imageSrc="assets/img/cmimc-2016-wide.jpg" />
    <Instructions />
    <Parallax imageSrc="assets/img/team-wide.jpg" />
    <Sponsors />
  </div>
);

export default Home;
