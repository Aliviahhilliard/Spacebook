import React from 'react';
import './Button.css'; // Import the styles for the button

const Button = ({ onClick, className, children }) => {
  return (
    <button className={`custom-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
