// vocalendar/frontend/src/components/common/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  onClick, 
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = "px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
    secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;