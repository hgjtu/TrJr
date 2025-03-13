import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ roles, children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.some(role => user?.roles?.includes(role))) {
    return <Navigate to="/" />; // Редирект на главную, если нет прав
  }

  return children;
};

export default PrivateRoute;