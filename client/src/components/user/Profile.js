import React, { Component } from "react";
import { getUserInfo, deleteUser } from "../common/fetchData";
import { withRouter, Redirect, Link } from "react-router-dom";
import { authenticate } from "../common/authenitcation";
import { logout } from "../auth/logout";

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      user: "",
      redirectToLogin: false,
      userAuth: false,
      redirect: false
    };
  }
  getUser = id => {
    let userId;
    if (id) {
      userId = id;
    } else {
      userId = this.props.match.params.userId;
    }
    const route = `${process.env.REACT_APP_API_URL}/user/${userId}`;
    getUserInfo(route)
      .then(user => {
        this.setState({
          user
        });
      })
      .catch(err => {
        if (err) {
          this.setState({
            redirectToLogin: true
          });
        }
      });

    if (authenticate().user._id === this.props.match.params.userId)
      this.setState({ userAuth: true });
    else this.setState({ userAuth: false });
  };

  componentDidMount() {
    this.getUser();
  }

  componentWillReceiveProps(props) {
    if (props) {
      this.getUser(props.match.params.userId);
      this.setState({ userAuth: true });
    }
  }

  // deleting user
  deleteUserAccount = () => {
    const answer = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (answer) {
      const token = authenticate().token;
      const userId = authenticate().user._id;
      const route = `${process.env.REACT_APP_API_URL}/user/${userId}`;

      deleteUser(route, token).then(res => {
        if (res.error) {
          console.log(res.error);
        } else {
          logout(() => {
            console.log("User is deleted!");
            this.setState({
              redirect: true
            });
          });
        }
      });
    } else {
      console.log(answer);
    }
  };

  render() {
    const redirectToLogin = this.state.redirectToLogin;
    const redirect = this.state.redirect;
    if (redirectToLogin) {
      return <Redirect to="/login" />;
    }

    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="profile">
        <div className="profile_info">
          <h2>Profile</h2>
          <p>Hello {this.state.user.name}</p>
          <p>Email: {this.state.user.email}</p>
          <p>{`Joined: ${new Date(this.state.user.created).toDateString()}`}</p>
        </div>
        {this.state.userAuth && (
          <div className="btns">
            <Link to={`/user/edit/${authenticate().user._id}`}>
              Edit Profile
            </Link>
            <button onClick={this.deleteUserAccount}>Delete Profile</button>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Profile);
