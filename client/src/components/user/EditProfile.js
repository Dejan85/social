import React, { Component } from "react";
import { authenticate } from "../common/authenitcation";
import { update } from "../common/fetchData";
import { Redirect } from "react-router-dom";

class EditProfile extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      photo: "",
      user: "",
      redirect: false,
      error: "",
      fileSize: 0
    };
  }

  componentDidMount() {
    this.userData = new FormData();
    this.setState({
      name: authenticate().user.name,
      email: authenticate().user.email
    });
  }

  onChange = e => {
    const value =
      e.target.name === "photo" ? e.target.files[0] : e.target.value;
    const fileSize = e.target.name === "photo" ? e.target.files[0].size : 0;

    this.userData.set(e.target.name, value);
    this.setState({
      [e.target.name]: value,
      fileSize
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const route = `${process.env.REACT_APP_API_URL}/user/${
      authenticate().user._id
    }`;
    const token = authenticate().token;

    update(route, token, this.userData).then(data => {
      if (data.error) {
        this.setState({
          error: data.error
        });
      } else {
        this.setState({
          redirect: true
        });
      }
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/user/${authenticate().user._id}`} />;
    }
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
            <label>Image</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={this.onChange}
            />
          </div>
          <div className="input_holder">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </div>
          <div className="input_holder">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div className="input_holder">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
