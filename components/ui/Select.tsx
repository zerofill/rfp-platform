
import React from 'react';
import { FieldOption } from '../../types';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: FieldOption[];
  hasError?: boolean;
}

const Select: React.FC<SelectProps> = ({ options, hasError, ...props }) => {
  const baseClasses = "block w-full pl-3 pr-10 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm transition";
  const errorClasses = "border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500";
  const normalClasses = "border-gray-300 focus:ring-blue-500 focus:border-blue-500";

  return (
    <select className={`${baseClasses} ${hasError ? errorClasses : normalClasses}`} {...props}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
