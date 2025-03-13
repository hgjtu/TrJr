import React from 'react';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Admin;