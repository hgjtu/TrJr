// RoleGuard.jsx
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../reducers/useAuth';

const RoleGuard = ({ children, requiredRoles }) => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
      return null; // Или <Loading />
  }

  if (!requiredRoles.some(role => hasRole(role))) {
      return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default RoleGuard;