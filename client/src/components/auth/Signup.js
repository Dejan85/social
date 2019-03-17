import React, { Component } from "react";
import { postData } from "../common/fetchData";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: ""
    };
  }

  onChange = name => e => {
    this.setState({
      [name]: e.target.value,
      error: ""
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const user = { name, email, password };
    const route = `${process.env.REACT_APP_API_URL}/signup`;

    postData(user, route).then(data => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          name: "",
          email: "",
          password: "",
          error: ""
        });
    });
  };

  render() {
    return (
      <div className="signup_and_login">
        <h1>Signup</h1>
        <form onSubmit={this.onSubmit}>
          {this.state.error && (
            <div className="error">
              <h2>{this.state.error}</h2>
            </div>
          )}
          <div className="input_holder">
            <label>Name</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.onChange("name")}
            />
          </div>
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

export default Signup;
