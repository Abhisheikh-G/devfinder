import "./App.css";
import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import LandingPage from "./components/layout/LandingPage";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <LandingPage />
    </Fragment>
  );
};

export default App;
