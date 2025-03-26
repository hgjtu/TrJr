import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import UserServise from "../services/UserServise";
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
    const dispatch = useDispatch();

    // Загрузка данных пользователя при монтировании компонента
    useEffect(() => {
        fetchUserData();
    }, []);

    // Функция для загрузки данных пользователя
    const fetchUserData = async () => {
        try {
            const response = await UserServise.getUserData();
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

    // Функция для обработки изменений в форме
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    // Функция для выхода из профиля
    const handleLogout = async () => {
        dispatch(setAuth(false));
        dispatch(setUser(null));
        await AuthService.logout();
    };

    // Функция для отправки обновленных данных на сервер
    const handleSave = async () => {
        try {
            const response = await UserServise.updateUserData(user.username, user.email);
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

    // Функция для уадления аккаунта
    const handleDeleteProfile = async () => {
        try {
            const response = await UserServise.deleteUserProfile(user.username);
            if (response.status == 204) {
                alert('Профиль успешно удален!');
                await AuthService.logout();
                dispatch(setAuth(false));
                dispatch(setUser(null));
            } else {
                alert('Ошибка при удалении профиля');
            }
        } catch (error) {
            console.error('Ошибка при удалении профиля:', error);
        }
    };

    return (
        <div className="user-profile">
            <h1>Личный кабинет</h1>
            <div className="profile-info">
                <div className="profile-picture">
                    {/* <img src={user.profilePicture || 'https://via.placeholder.com/150'} alt="Фото профиля" /> */}
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
                        {/* <label>
                            Фото профиля (URL):
                            <input
                                type="text"
                                name="profilePicture"
                                value={user.profilePicture}
                                onChange={handleInputChange}
                            />
                        </label> */}
                        <button type="button" onClick={handleSave}>
                            Сохранить
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)}>
                            Отмена
                        </button>
                    </form>
                ) : (
                    <div className="profile-details">
                        <p><strong>Логин:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <button type="button" onClick={() => setIsEditing(true)}>
                            Редактировать профиль
                        </button>
                        <button type="button" onClick={handleLogout}>
                            Выйти
                        </button>
                        <button type="button" onClick={handleDeleteProfile}>
                            Удалить аккаунт
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;