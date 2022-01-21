import { Indexed } from './types';

export function formatDateTime(date: Date): string {
  const DD = date.getDate().toString().padStart(2, '0');
  const MM = (date.getMonth() + 1).toString().padStart(2, '0');
  const YYYY = date.getFullYear().toString();

  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');

  return `${DD}.${MM}.${YYYY} ${hh}:${mm}`;
}

// если в JSON.parse() передать строку, которая не является результатом работы JSON.stringify()
// программа может упасть с ошибкой, для обработки таких случаев создана данная функция
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
