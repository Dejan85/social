import React from "react";
import { Link, withRouter } from "react-router-dom";
import { authenticate } from "../common/authenitcation";
import { logout } from "../auth/logout";

const active = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  }
};

const capitalizeString = string => {
  return string.charAt(0).toUpperCase() + string.slice(1) + "`s profile";
};

const Nav = ({ history }) => {
  return (
    <ul>
      <li>
        <Link to="/" style={active(history, "/")}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/users" style={active(history, "/users")}>
          Users
        </Link>
      </li>
      {!localStorage.getItem("token") && (
        <li>
          <Link to="/signup" style={active(history, "/signup")}>
            Signup
          </Link>
        </li>
      )}
      <li>
        {!localStorage.getItem("token") && (
          <Link to="/login" style={active(history, "/login")}>
            Login
          </Link>
        )}
      </li>
      {localStorage.getItem("token") && (
        <li>
          <Link
            style={active(history, "/logout")}
            onClick={() =>
              logout(() => {
                history.push("/");
              })
            }
            to="#"
          >
            Signout
          </Link>
        </li>
      )}
      {authenticate() && (
        <li>
          <Link
            to={`/user/${authenticate().user._id}`}
            style={active(history, `/user/${authenticate().user._id}`)}
          >
            {capitalizeString(authenticate().user.name)}
          </Link>
        </li>
      )}
    </ul>
  );
};

export default withRouter(Nav);
