import React, { Component } from "react";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// components
import Home from "./components/home/Home";
import Signup from "./components/auth/Signup";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
