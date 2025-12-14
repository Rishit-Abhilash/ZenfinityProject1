// Utility functions for formatting data
import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string, formatString: string = 'MMM dd, yyyy HH:mm'): string {
  try {
    return format(parseISO(dateString), formatString);
  } catch (error) {
    return dateString;
  }
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatDuration(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)} min`;
  }
  return `${formatNumber(hours, 1)} hrs`;
}

export function formatDistance(km: number): string {
  return `${formatNumber(km, 1)} km`;
}

export function formatSpeed(kmh: number): string {
  return `${formatNumber(kmh, 1)} km/h`;
}

export function formatVoltage(v: number): string {
  return `${formatNumber(v, 2)} V`;
}

export function formatTemperature(celsius: number): string {
  return `${formatNumber(celsius, 1)}°C`;
}
