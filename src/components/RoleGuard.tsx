import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserState } from '../reducers/userReducer';
import { RootState } from '../store/store';


const RoleGuard = ({ children, requiredRoles }:
  { children: any, requiredRoles: any }) => {
  const user = useSelector((state: RootState) => state.user.user);

  console.log(user, user?.role, requiredRoles);

  if (!user) {
      return null; // Или <Loading />
  }

  if (!requiredRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default RoleGuard;