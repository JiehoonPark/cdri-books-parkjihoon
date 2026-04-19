import { useState, type ReactNode } from 'react';
import type { KakaoBook } from '../types';
import { BookListItem } from './BookListItem';
import { BookExpanded } from './BookExpanded';

interface BookRowProps {
  book: KakaoBook;
  renderWish?: (size: number) => ReactNode;
}

export function BookRow({ book, renderWish }: BookRowProps) {
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      <BookExpanded
        book={book}
        wishSlot={renderWish?.(24)}
        onCollapse={() => setExpanded(false)}
      />
    );
  }

  return (
    <BookListItem
      book={book}
      wishSlot={renderWish?.(16)}
      onExpand={() => setExpanded(true)}
    />
  );
}
