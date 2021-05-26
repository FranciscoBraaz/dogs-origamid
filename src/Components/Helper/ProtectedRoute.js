import React from "react";
import { Navigate, Route } from "react-router";
import UserContext from "../../contexts/UserContext";

const ProtectedRoute = (props) => {
  const { authenticated } = React.useContext(UserContext);
  if (authenticated === true) return <Route {...props} />;
  else if (authenticated === false) return <Navigate to="/login" />;
  else return null;
};

export default ProtectedRoute;
