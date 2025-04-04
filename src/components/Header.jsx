import React from 'react';
import Logo from './Logo'
import Navigation from './Navigation'
import '../styles/header.css'
import { Link } from 'react-router';

function Header(){
    return(
    <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="logo-link">
              <h1 className="logo">Путевые заметки</h1>
            </Link>
            <Logo src="https://www.mirea.ru/upload/medialibrary/281/IIT_colour.jpg" />
            <p className="tagline">Делитесь впечатлениями и вдохновляйтесь</p>
          </div>
        <Navigation />
        </div>
        <div className="header-spacer"></div>
    </header>
    );
}
export default Header;