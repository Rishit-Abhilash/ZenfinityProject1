// Dashboard Component Types

export interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface SelectOption {
  label: string;
  value: string | number;
}
