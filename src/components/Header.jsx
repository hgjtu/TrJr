import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Navigation from './Navigation';
import '../styles/header.css';

function Header() {
    return (
        <header className="app-header">
            <div className="header-container">
                <div className="header-content">
                    <div className="header-brand">
                        <Link to="/" className="logo-link">
                            <Logo src="https://www.mirea.ru/upload/medialibrary/281/IIT_colour.jpg" />
                            <span className="brand-name">TravelFeed</span>
                        </Link>
                        <p className="tagline">Делитесь впечатлениями и вдохновляйтесь</p>
                    </div>
                    <Navigation />
                </div>
            </div>
        </header>
    );
}

export default Header;