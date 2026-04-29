/**
 * Formats a date string from YYYY-MM-DD to DD/MM/YYYY format
 * @param dateString - A date string in YYYY-MM-DD format
 * @returns Formatted date string in DD/MM/YYYY format, or "—" if invalid
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return '—';
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return '—';
  }

  const [year, month, day] = dateString.split('-');
  
  if (!year || !month || !day) {
    return '—';
  }

  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);

  if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) {
    return '—';
  }

  return `${day}/${month}/${year}`;
}
