import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router';

const ProtectedRoute = (props) => {
  const { data } = useSelector((state) => state.user);

  if (data !== null) return <Route {...props} />;
  else if (data === null) return <Navigate to="/login" />;
  else return null;
};

export default ProtectedRoute;
