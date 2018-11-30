import React, { Component } from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import axios from "axios";

import Register from "./components/Register";
import Login from "./components/Login";

import "./App.css";

const Home = props => {
  const logOut = () => {
    localStorage.removeItem("jwtToken");
    props.history.push("/login");
  };

  if (props.loggedIn) {
    return (
      <div>
        <button
          onClick={() => logOut()}
          style={{
            width: "20%",
            backgroundColor: "#dc3545",
            borderColor: "#dc3545"
          }}
        >
          Log out
        </button>
        <ol>
          {props.users.map(user => (
            <li key={user.id}>
              <h1>{user.setup}</h1>
              <p>{user.punchline}</p>
              <br />
            </li>
          ))}
        </ol>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

class App extends Component {
  state = {
    loggedIn: false,
    users: []
  };

  authenticate = () => {
    const url = "http://localhost:3300/api/jokes";
    const token = localStorage.getItem("jwtToken");
    const options = {
      headers: {
        Authorization: token
      }
    };

    if (token) {
      axios
        .get(url, options)
        .then(res => {
          if (res.status === 200 && res.data) {
            this.setState({ loggedIn: true, users: res.data });
          } else {
            throw new Error();
          }
        })
        .catch(err => this.props.history.push("/login"));
    } else {
      this.props.history.push("/login");
    }
  };

  componentDidMount() {
    this.authenticate();
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    console.log(this.props);
    console.log(prevProps);
    if (pathname === "/" && pathname !== prevProps.location.pathname) {
      this.authenticate();
    }
  }

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
            <Route
              exact
              path="/"
              render={ownProps => (
                <Home
                  {...ownProps}
                  loggedIn={this.state.loggedIn}
                  users={this.state.users}
                />
              )}
            />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
