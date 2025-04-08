import React from 'react';
import {Link} from "react-router-dom";
import '../styles/navigation.css'
import profileIcon from '../assets/react.svg';
import { useSelector } from 'react-redux';
import AuthService from "../services/AuthService";

function Navigation() {
    const isAuth = useSelector((state) => state.user.isAuth);

    return (
        // {/* <li><Link to="/about">О нас</Link></li> */}
        // {/* <li><Link to="/user">Страница для пользователя</Link></li>
        // <li><Link to="/admin">Страница для администратора</Link></li> */}
        <nav className="header-nav">
        <ul className="nav-list">
            {isAuth ? (
                <>
                <li className="nav-item">
                    <Link to="/create-post" className="nav-link highlight">Создать запись</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile">
                        <img src={profileIcon} alt="Личный кабинет" style={{ width: '30px', height: '30px' }} />
                    </Link>
                </li>
                </>
            ) : (
                <>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Войти</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-button">Регистрация</Link>
                </li>
                </>
            )}
        </ul>
        </nav>
    );
}
export default Navigation;