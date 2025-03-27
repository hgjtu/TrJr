import { useEffect, useState } from 'react';
import { useAuth } from '../reducers/useAuth';
import UserService from "../services/UserService";

const UserPage = () => {
  return (
    <div className="user-page">     
      <p>Страница для пользователя с ролью: ЮЗЕР или АДМИН</p>
    </div>
  );
};

export default UserPage;