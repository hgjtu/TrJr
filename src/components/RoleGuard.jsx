// RoleGuard.jsx
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const RoleGuard = ({ children, requiredRoles }) => {
  const user = useSelector((state) => state.user);

  if (!user) {
      return null; // Или <Loading />
  }

  if (!requiredRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default RoleGuard;