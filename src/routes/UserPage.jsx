import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UserPage = () => {
  const user = useSelector((state) => state.user).data;
  const [isAccess, setAccess] = useState(true);

  console.log(user);

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