import React from 'react';
import '../styles/Logo'

function Logo({src}) {
    return (
    <img src={src} alt="Logo" className="logo"/>
    );
}
export default Logo;