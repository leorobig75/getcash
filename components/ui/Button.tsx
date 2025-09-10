
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "text-gray-300 bg-gray-700 hover:bg-gray-600 focus:ring-gray-500",
  };

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${props.className || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
