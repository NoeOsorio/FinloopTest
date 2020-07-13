import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./global.scss";
import {  BrowserRouter as Router, Link, Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Users from "./Pages/Users";

function App() {
  return (
    <Router>
      <div>
          <Switch>
            <Route path="/login">
            <Login></Login>
            </Route>
            <Route path="/signup">
              <Signup></Signup>
            </Route>
            <Route path="/users">
              <Users></Users>
            </Route>
            <Route path="/">
              <Login></Login>
            </Route>
          </Switch>
        </div>
    </Router>

  );
}

export default App;

