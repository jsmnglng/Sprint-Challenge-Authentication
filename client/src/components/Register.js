import React, { Component } from "react";
import axios from "axios";

const initialUser = {
  username: "",
  password: ""
};

class Register extends Component {
  state = {
    user: { ...initialUser },
    message: ""
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
  };

  handleSubmit = e => {
    e.preventDefault();
    const url = "http://localhost:3300/api/register";

    axios
      .post(url, this.state.user)
      .then(res => {
        console.log(res);
        this.setState({
          user: { ...initialUser },
          message: "Registration successful"
        });
      })
      .catch(err => {
        this.setState({
          user: { ...initialUser },
          message: "Registration failed"
        });
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <button>Register</button>
          </div>
        </form>
        {this.state.message ? <h4>{this.state.message}</h4> : undefined}
      </div>
    );
  }
}

export default Register;
