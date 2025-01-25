import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ 
  className, 
  type = 'text', 
  label,
  ...props 
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={props.id} 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'sm:text-sm',
          className
        )}
        {...props}
      />
    </div>
  );
}
