import { useEffect, useState } from 'react';
import { useAuth } from '../reducers/useAuth';
import UserService from "../services/UserService";

const AdminPage = () => {
  const { user } = useAuth();
  const [isAccess, setAccess] = useState(null);
  const [users, setUsers] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.adminMainPageAccess();
        if(response.status == 200) setAccess(true);
        else setAccess(false);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    
    fetchData();
  }, []);

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