import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const AdminPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  
  if (!user) {
    return null; // Или <Loading />
  }

  return (
    <div className="admin-page">
      <p>Ваш логин: {user.username}</p> 
      <p>Страница для пользователя с ролью: АДМИН</p>
    </div>
  );
};

export default AdminPage;