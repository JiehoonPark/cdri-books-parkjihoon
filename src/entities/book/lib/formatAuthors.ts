const MAX_VISIBLE_AUTHORS = 2;

export function formatAuthors(authors: string[]): string {
  if (authors.length === 0) return '';
  if (authors.length <= MAX_VISIBLE_AUTHORS) return authors.join(', ');
  const visible = authors.slice(0, MAX_VISIBLE_AUTHORS).join(', ');
  const rest = authors.length - MAX_VISIBLE_AUTHORS;
  return `${visible} 외 ${rest}명`;
}
