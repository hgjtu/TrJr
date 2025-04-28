import React from 'react';
import '../styles/logo.css'

function Logo({src}) {
    return (
    <img src={src} alt="Logo" className="logo"/>
    );
} 
export default Logo;