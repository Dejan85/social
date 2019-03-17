import React, { Component } from "react";
import { getUsers } from "../common/fetchData";
import avatar from "../../images/avatar.png";
import { Link } from "react-router-dom";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: undefined
    };
  }

  componentDidMount() {
    const route = `${process.env.REACT_APP_API_URL}/users`;
    getUsers(route)
      .then(res => {
        this.setState({ users: res });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="users">
        <h1>Users</h1>
        <div className="card_container">
          {this.state.users &&
            this.state.users.map((user, id) => {
              return (
                <div key={id} className="card">
                  <img src={avatar} alt="img" />
                  <div className="name">{user.name}</div>
                  <div className="email">{user.email}</div>
                  <Link to={`user/${user._id}`}>View Profile</Link>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Users;
