import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


const UserPage = () => {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) {
    return null; // Или <Loading />
  }
  
  return (
    <div className="user-page">   
      <p>Ваш логин: {user.username}</p>  
      <p>Страница для пользователя с ролью: ЮЗЕР или АДМИН</p>
    </div>
  );
};

export default UserPage;