import { useEffect, useState } from 'react';
import { useAuth } from '../reducers/useAuth';
import UserService from "../services/UserService";

const UserPage = () => {
  const { user } = useAuth();
  const [isAccess, setAccess] = useState(true);

  return (
    <div className="user-page">
      <h1>Welcome, {user?.username}!</h1>
      <p>This is your personal dashboard</p>
      
      <div className="dashboard-content">
        <h2>Dashboard</h2>
        {isAccess ? (
          <p>Страница для пользователя с ролью: ЮЗЕР</p>
        ) : (
          <p>Loading your data...</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;