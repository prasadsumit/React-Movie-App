import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthGuardFunction';

function RequireAuth({ children }) {
  const { user } = useAuth();

  // If user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/login"/>;
  }

  return children;
}

export default RequireAuth;
