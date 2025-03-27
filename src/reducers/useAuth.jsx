import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user } = useSelector(state => state.user);
  
  
  const hasRole = (role) => {

    if (!user || !user.role) return false;
    return user.role.includes(role);
  };
  
  const isAdmin = hasRole('ROLE_ADMIN');
  const isUser = hasRole('ROLE_USER');
  
  return { user, isAdmin, isUser, hasRole };
};