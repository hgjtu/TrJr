import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import '../styles/navigation.css';
import defaultProfileIcon from '../assets/default-user-img.png';
import AuthService from "../services/AuthService";

function Navigation() {
    const isAuth = useSelector((state) => state.user.isAuth);
    const userImage = useSelector((state) => state.user.user?.image);

    const isAdmin = (useSelector((state) => state.user.user?.role) === "ROLE_MODERATOR"
                    || useSelector((state) => state.user.user?.role) === "ROLE_ADMIN");

    const handleLogout = async () => {
            await AuthService.logout();
        };

    return (
        <nav className="navbar">
            <ul className="nav-menu">
                {isAuth ? (
                    <>
                        {isAdmin && (
                            <li className="nav-item">
                                <Link to="/moderator" className="nav-link admin-link">
                                    <span className="link-text">Панель модератора</span>
                                </Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link to="/create-post" className="nav-link highlight">
                                <span className="link-icon">+</span>
                                <span className="link-text">Создать запись</span>
                            </Link>
                        </li>
                        <li className="nav-item profile-item">
                            <Link to="/profile" className="profile-link">
                                <div className="profile-badge">
                                    <img 
                                        src={userImage || defaultProfileIcon} 
                                        alt="Профиль" 
                                        className="profile-icon" 
                                    />
                                    {/* <span className="profile-notification"></span> */}
                                </div>
                            </Link>
                            <div className="profile-dropdown">
                                <Link to="/profile" className="dropdown-link">Мой профиль</Link>
                                {/* <Link to="/settings" className="dropdown-link">Настройки</Link> */}
                                <button className="dropdown-link logout" onClick={handleLogout}>
                                    Выйти
                                </button>
                            </div>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link login-link">
                                <span className="link-text">Войти</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-button">
                                <span className="link-text">Регистрация</span>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;