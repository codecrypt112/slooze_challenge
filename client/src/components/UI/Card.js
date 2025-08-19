import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'medium',
  shadow = 'soft',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl border border-gray-100 transition-all duration-300';
  
  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  const shadowClasses = {
    none: '',
    soft: 'shadow-soft',
    medium: 'shadow-medium',
    large: 'shadow-large'
  };

  const hoverClasses = hover ? 'hover:shadow-medium hover:-translate-y-1 cursor-pointer' : '';

  return (
    <div 
      className={`${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;