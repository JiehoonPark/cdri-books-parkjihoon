import { cn } from '../lib/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded bg-light-gray', className)}
    />
  );
}
