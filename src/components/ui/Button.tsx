import React from 'react';
import styles from './Button.module.css';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        size !== 'medium' && styles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
