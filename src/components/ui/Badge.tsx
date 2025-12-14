import React from 'react';
import styles from './Badge.module.css';
import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'danger' | 'success' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[variant], className)}>
      {children}
    </span>
  );
}
