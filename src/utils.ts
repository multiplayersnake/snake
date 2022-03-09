import { Indexed } from './types';

export function isValidDate(date: Date) {
  return date instanceof Date && !isNaN(date.valueOf());
}

export function formatDateTime(input: Date | string): string {
  const date = typeof input === 'string' ? new Date(input) : input;

  if (!isValidDate(date)) {
    return `??.??.???? ??:??`;
  }

  const DD = date.getDate().toString().padStart(2, '0');
  const MM = (date.getMonth() + 1).toString().padStart(2, '0');
  const YYYY = date.getFullYear().toString();

  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');

  return `${DD}.${MM}.${YYYY} ${hh}:${mm}`;
}

export function parseSerializedData<T extends Indexed>(serializedData: string, defaultValue: T = null): T {
  try {
    const data = JSON.parse(serializedData);

    if (!data) {
      return defaultValue;
    }

    return data;
  } catch {
    return defaultValue;
  }
}

export const isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);
