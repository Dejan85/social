import React, { Component } from "react";
import { fetchData } from "./fetchData";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      error: "",
      redirect: false
    };
  }

  onChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = { email, password };
    const route = "http://localhost:5000/login";

    fetchData(user, route)
      .then(data => {
        if (data.error) this.setState({ error: data.error });
        else
          this.setState({
            email: "",
            password: "",
            error: ""
          });
        localStorage.setItem("token", JSON.stringify(data.token));
        this.setState({ redirect: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="signup_and_login">
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          {this.state.error && (
            <div className="error">
              <h2>{this.state.error}</h2>
            </div>
          )}

          <div className="input_holder">
            <label>Email</label>
            <input
              type="email"
              value={this.state.email}
              onChange={this.onChange("email")}
            />
          </div>

          <div className="input_holder">
            <label>Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.onChange("password")}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
