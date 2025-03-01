import React from 'react';
import Logo from './Logo'
import Navigation from './Navigation'
import '../styles/header.css'

function Header(){
    return(
    <header className='header'>
        <Logo src="https://www.mirea.ru/upload/medialibrary/281/IIT_colour.jpg" />
        <Navigation />
    </header>
    );
}
export default Header;