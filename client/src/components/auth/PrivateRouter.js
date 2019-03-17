import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authenticate } from "../common/authenitcation";

const PrivateRoute = ({ component: Component, ...rest }) => (
  // props means components passed down to thirs pricate route component
  <Route
    {...rest}
    render={props => {
      if (authenticate()) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }
    }}
  />
);

export default PrivateRoute;
