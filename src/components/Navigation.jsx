import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import '../styles/navigation.css';
import defaultProfileIcon from '../assets/default-user-img.png';

function Navigation() {
    const isAuth = useSelector((state) => state.user.isAuth);
    const userImage = useSelector((state) => state.user.user?.image);


    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-brand">
                    <Link to="/" className="brand-link">TravelFeed</Link>
                </div>
                <ul className="nav-menu">
                    {isAuth ? (
                        <>
                            <li className="nav-item">
                                <Link to="/create-post" className="nav-link highlight">
                                    <span className="link-icon">+</span>
                                    <span className="link-text">Создать запись</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/profile" className="profile-link">
                                    <img 
                                        src={userImage || defaultProfileIcon} 
                                        alt="Личный кабинет" 
                                        className="profile-icon" 
                                    />
                                    <span className="profile-tooltip">Профиль</span>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
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
            </div>
        </nav>
    );
}

export default Navigation;