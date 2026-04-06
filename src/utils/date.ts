export function formatDate(date: Date) {
  return {
    display: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    datetime: date.toISOString().split('T')[0],
  };
}
