import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./Auth";

const AdminRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.role === "banker" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoutes;
