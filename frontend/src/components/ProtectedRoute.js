
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../authContext";

const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {

  const {isLoggedIn} = useContext(AuthContext);
  
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!isLoggedIn ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};


export default ProtectedRoute
