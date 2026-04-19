import { useState } from 'react';
import { BookIcon } from '../../../shared/ui/icons';
import { cn } from '../../../shared/lib/cn';

interface BookThumbnailProps {
  src: string;
  alt: string;
  className?: string;
}

export function BookThumbnail({ src, alt, className }: BookThumbnailProps) {
  const [errored, setErrored] = useState(false);
  const showFallback = !src || errored;

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden bg-light-gray',
        className,
      )}
    >
      {showFallback ? (
        <BookIcon size="60%" />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setErrored(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
