import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Navigation from './Navigation';
import '../styles/header.css';
import icon from '../assets/icon.png';

function Header() {
    return (
        <header className="app-header">
            <div className="header-container">
                <div className="header-content">
                    <div className="header-brand">
                        <Link to="/" className="logo-link">
                            <Logo src={icon} />
                            <div className="brand-text">
                                <span className="brand-name">Журнал путешествий</span>
                                <p className="tagline">Делитесь впечатлениями и вдохновляйтесь</p>
                            </div>
                        </Link>
                    </div>
                    <Navigation />
                </div>
            </div>
        </header>
    );
}

export default Header;