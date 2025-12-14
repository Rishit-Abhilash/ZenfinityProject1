// Allowed IMEIs for Zenfinity Battery API

export const ALLOWED_IMEIS = [
  '865044073967657',
  '865044073949366',
] as const;

export const DEFAULT_IMEI = ALLOWED_IMEIS[0];

export type AllowedIMEI = typeof ALLOWED_IMEIS[number];
