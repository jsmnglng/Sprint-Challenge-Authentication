import React, { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";

import Register from "./components/Register";

import "./App.css";

const Home = props => {
  return <h1>Home</h1>;
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink exact to="/" activeStyle={{ textDecoration: "underline" }}>
              Home
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink
              to="/register"
              activeStyle={{ textDecoration: "underline" }}
            >
              Register
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/login" activeStyle={{ textDecoration: "underline" }}>
              Login
            </NavLink>
          </nav>
        </header>
        <section>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            {/* <Route path="/login" component={Login} /> */}
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
