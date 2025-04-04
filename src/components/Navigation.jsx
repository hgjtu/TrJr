import React from 'react';
import {Link} from "react-router-dom";
import '../styles/navigation.css'
import profileIcon from '../assets/react.svg';

function Navigation() {
    return (
    <nav>
    <ul>
        <li><Link to="/">Главная</Link></li>
        <li><Link to="/categories">Категории</Link></li>
        <li><Link to="/about">О нас</Link></li>
        <li><Link to="/user">Страница для пользователя</Link></li>
        <li><Link to="/admin">Страница для администратора</Link></li>
        <li>
            <Link to="/profile">
                <img src={profileIcon} alt="Личный кабинет" style={{ width: '24px', height: '24px' }} />
            </Link>
        </li>
    </ul>
    </nav>
    );
}
export default Navigation;