import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'outline' | 'ghost';
type ButtonSize = 'default' | 'sm' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const buttonVariantsMap = {
  default: 'bg-primary-500 text-white hover:bg-primary-600',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
  ghost: 'hover:bg-gray-100 text-gray-700'
};

const buttonSizesMap = {
  default: 'px-4 py-2 text-base',
  sm: 'px-3 py-1 text-sm',
  lg: 'px-6 py-3 text-lg'
};

export function Button({
  children,
  variant = 'default',
  size = 'default',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
        buttonVariantsMap[variant],
        buttonSizesMap[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function buttonVariants({ 
  variant = 'default', 
  size = 'default' 
}: { 
  variant?: ButtonVariant; 
  size?: ButtonSize; 
} = {}) {
  return cn(
    'rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
    buttonVariantsMap[variant],
    buttonSizesMap[size]
  );
}
