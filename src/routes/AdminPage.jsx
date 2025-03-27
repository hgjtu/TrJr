import { useEffect, useState } from 'react';
import { useAuth } from '../reducers/useAuth';
import UserService from "../services/UserService";

const AdminPage = () => {
  const { user } = useAuth();
  const [isAccess, setAccess] = useState(true);

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>
      <p>Welcome, Administrator {user?.username}!</p>
      
      <div className="dashboard-content">
        <h2>Dashboard</h2>
        {isAccess ? (
          <p>Страница для пользователя с ролью: АДМИН</p>
        ) : (
          <p>Loading your data...</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;