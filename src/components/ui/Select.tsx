import React from 'react';
import styles from './Select.module.css';
import { cn } from '@/lib/utils/cn';
import type { SelectOption } from '@/types/dashboard';

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder,
  className,
  ...props
}: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <select
      className={cn(styles.select, className)}
      value={value}
      onChange={handleChange}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
