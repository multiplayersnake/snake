// Функции, необходимые любым модулям

export function formatDateTime(date: Date): string {
  const DD = date.getDate().toString().padStart(2, '0');
  const MM = (date.getMonth() + 1).toString().padStart(2, '0');
  const YYYY = date.getFullYear().toString();

  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');

  return `${DD}.${MM}.${YYYY} ${hh}:${mm}`;
}
