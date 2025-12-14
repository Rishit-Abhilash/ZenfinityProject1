import React from 'react';
import styles from './Card.module.css';
import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className, title }: CardProps) {
  return (
    <div className={cn(styles.card, className)}>
      {title && (
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
      )}
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}
