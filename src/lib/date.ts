export function formatDateOnly(
  value: string,
  month: 'short' | 'long' = 'long'
): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month,
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00.000Z`));
}
