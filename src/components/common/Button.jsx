import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = '',
  icon = null
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
    secondary: 'bg-white/10 hover:bg-white/20',
    danger: 'bg-red-600 hover:bg-red-700',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${className}
        rounded-lg font-medium transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center gap-2
      `}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
