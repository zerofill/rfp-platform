
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input: React.FC<InputProps> = ({ hasError, ...props }) => {
  const baseClasses = "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm transition";
  const errorClasses = "border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500";
  const normalClasses = "border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500";

  return (
    <input className={`${baseClasses} ${hasError ? errorClasses : normalClasses}`} {...props} />
  );
};

export default Input;
