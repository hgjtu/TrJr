import { useAuth } from '../reducers/useAuth';
import { Navigate } from 'react-router-dom';

const RoleGuard = ({ children, requiredRoles }) => {
  const { hasRole } = useAuth();
  
  const hasAccess = requiredRoles.some(role => hasRole(role));
  
  if (!hasAccess) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default RoleGuard;