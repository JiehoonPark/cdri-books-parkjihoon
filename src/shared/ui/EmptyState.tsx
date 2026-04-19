import { BookIcon } from './icons';

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-6 py-24"
    >
      <BookIcon size={80} />
      <p className="text-caption text-text-secondary">{message}</p>
    </div>
  );
}
