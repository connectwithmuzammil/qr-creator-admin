import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthenticatedRoute = ({ element: Component, ...rest }) => {
  const { user } = useSelector((store) => store.user); // Get user from redux store
  const location = useLocation();

  // If there is no user (not authenticated), redirect to login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated, render the component
  return <Component {...rest} />;
};

export default AuthenticatedRoute;
