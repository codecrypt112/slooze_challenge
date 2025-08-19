import React from 'react';

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-all duration-200';
  
  const variants = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    error: 'bg-error-100 text-error-800',
    admin: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800',
    manager: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800',
    member: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800'
  };

  const sizes = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-0.5 text-xs',
    large: 'px-3 py-1 text-sm'
  };

  return (
    <span 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;