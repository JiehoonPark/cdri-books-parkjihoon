import { useState, type ReactNode } from 'react';
import type { KakaoBook } from '../types';
import { BookListItem } from './BookListItem';
import { BookExpanded } from './BookExpanded';

interface BookRowProps {
  book: KakaoBook;
  wishSlot?: ReactNode;
}

export function BookRow({ book, wishSlot }: BookRowProps) {
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      <BookExpanded
        book={book}
        wishSlot={wishSlot}
        onCollapse={() => setExpanded(false)}
      />
    );
  }

  return (
    <BookListItem
      book={book}
      wishSlot={wishSlot}
      onExpand={() => setExpanded(true)}
    />
  );
}
