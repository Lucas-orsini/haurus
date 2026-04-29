export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr || typeof dateStr !== 'string') {
    return '—';
  }

  // Expected format: YYYY-MM-DD
  const parts = dateStr.split('-');
  if (parts.length !== 3) {
    return '—';
  }

  const [year, month, day] = parts;
  if (year.length !== 4 || month.length !== 2 || day.length !== 2) {
    return '—';
  }

  return `${day}/${month}/${year}`;
}
