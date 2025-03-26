import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user } = useSelector(state => state.auth);
  
  const hasRole = (role) => {
    if (!user || !user.role) return false;
    return user.role.includes(role);
  };
  
  const isAdmin = hasRole('ADMIN');
  const isUser = hasRole('USER');
  
  return { user, isAdmin, isUser, hasRole };
};