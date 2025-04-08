import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";
import profileIcon from '../assets/react.svg';
import '../styles/profile.css';


function Profile() { //НУЖНЫ ПРОВЕРКИ НА ОШИБКИ
    const [user, setUser] = useState({
        username: '',
        email: '',
        // profilePicture: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await UserService.getUserData();
            console.log(response.data)
            setUser(prevUser => ({
                ...prevUser,
                username: response.data.username,
                email: response.data.email,
            }));
            
            console.log(user)
        } catch (error) {
            console.error('Ошибка при загрузке данных пользователя:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleLogout = async () => {
        setUser(prevUser => ({
            ...prevUser,
            username: "",
            email: "",
        }));
        await AuthService.logout();
    };

    const handleSave = async () => {
        try {
            const response = await UserService.updateUserData(user.username, user.email);
            console.log(response);
            if (response.status == 200) {
                alert('Данные успешно обновлены!');
                setIsEditing(false);
            } else {
                alert('Ошибка при обновлении данных');
            }
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error);
        }
    };

    return (
        <div className="user-profile">
          <h1>Личный кабинет</h1>
          <div className="profile-info">
            <div className="profile-picture">
              <img src={profileIcon} alt="Фото профиля" />
            </div>
            {isEditing ? (
              <form>
                <label>
                  Имя:
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    readOnly
                    disabled
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                </label>
                <div className="button-group">
                  <button type="button" className="button-primary" onClick={handleSave}>
                    Сохранить
                  </button>
                  <button type="button" className="button-secondary" onClick={() => setIsEditing(false)}>
                    Отмена
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-details">
                <p><strong>Логин:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <div className="button-group">
                  <button type="button" className="button-primary" onClick={() => setIsEditing(true)}>
                    Редактировать
                  </button>
                  <button type="button" className="button-secondary" onClick={handleLogout}>
                    Выйти
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
}

export default Profile;