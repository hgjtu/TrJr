import React from 'react';
import '../styles/loading-spinner.css';

const LoadingSpinner = ({ size = 'medium', color = '#4CAF50' }) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  return (
    <div className="loading-spinner-container">
      <div 
        className={`loading-spinner ${sizeClasses[size]}`}
        style={{ borderTopColor: color }}
      ></div>
      <span className="loading-text" style={{ color }}>Загрузка...</span>
    </div>
  );
};

export default LoadingSpinner;