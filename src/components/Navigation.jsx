import React from 'react';
import {Link} from "react-router-dom";
import '../styles/navigation.css'

function Navigation() {
    return (
    <nav>
    <ul>
        <li><Link to="/">Главная</Link></li>
        <li><Link to="/categories">Категории</Link></li>
        <li><Link to="/about">О нас</Link></li>
        <li><Link to="/agreement">Соглашение</Link></li>
        <li><Link to="/user">Страница для пользователя</Link></li>
        <li><Link to="/admin">Страница для администратора</Link></li>
    </ul>
    </nav>
    );
}
export default Navigation;