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
            <input
              placeholder="Enter username"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
              required
            />
          </div>
          <div>
            <input
              placeholder="Enter password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
              required
            />
          </div>
          <div>
            <button>Register</button>
          </div>
        </form>
        {this.state.message ? (
          <h4 style={{ textAlign: "center" }}>{this.state.message}</h4>
        ) : (
          undefined
        )}
      </div>
    );
  }
}

export default Register;
