import { useEffect, useState } from 'react';
import { useAuth } from '../reducers/useAuth';
import UserService from "../services/UserService";

const AdminPage = () => {
  const { user } = useAuth();
  const [isAccess, setAccess] = useState(true);

  return (
    <div className="admin-page">
      <p>Страница для пользователя с ролью: АДМИН</p>
    </div>
  );
};

export default AdminPage;