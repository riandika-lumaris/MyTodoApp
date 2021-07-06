import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Register from "./components/Register/Register";

import Login from "./components/Login/Login";

import Home from "./components/Home/Home";

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path = "/Register" component = { Register } />
          <Route path = "/Login" component = { Login } />
          <Route path = "/" component = { Home } />
        </Switch>
        <Footer />
      </React.Fragment>
    );
}

export default App;
