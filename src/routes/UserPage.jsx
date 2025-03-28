import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UserPage = () => {
  return (
    <div className="user-page">     
      <p>Страница для пользователя с ролью: ЮЗЕР или АДМИН</p>
    </div>
  );
};

export default UserPage;