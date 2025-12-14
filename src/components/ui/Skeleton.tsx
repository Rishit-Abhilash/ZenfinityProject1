import React from 'react';
import styles from './Skeleton.module.css';
import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  variant?: 'text' | 'card' | 'chart';
  className?: string;
  width?: string;
  height?: string;
}

export function Skeleton({ variant = 'text', className, width, height }: SkeletonProps) {
  return (
    <div
      className={cn(styles.skeleton, variant && styles[variant], className)}
      style={{ width, height }}
    />
  );
}
