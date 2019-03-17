import React, { Component } from "react";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// components
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";

// auth component
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

// user component
import Users from "./components/user/Users";
import Profile from "./components/user/Profile";
import EditProfile from "./components/user/EditProfile";

// private route
import PrivateRoute from "./components/auth/PrivateRouter";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            {/* home route */}
            <Route exact path="/" component={Home} />

            {/* auth route */}
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />

            {/* user route */}
            <Route exact path="/users" component={Users} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
            <PrivateRoute
              exact
              path="/user/edit/:userId"
              component={EditProfile}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
