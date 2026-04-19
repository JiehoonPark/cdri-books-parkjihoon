import { useState, type ReactNode } from 'react';
import type { KakaoBook } from '../types';
import { BookListItem } from './BookListItem';
import { BookExpanded } from './BookExpanded';

interface BookRowProps {
  book: KakaoBook;
  renderWish?: (size: number) => ReactNode;
}

const COLLAPSED_HEIGHT = 100;
const EXPANDED_HEIGHT = 344;

export function BookRow({ book, renderWish }: BookRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li
      className="overflow-hidden border-b border-divider transition-[height] duration-300 ease-in-out"
      style={{ height: expanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT }}
    >
      {expanded ? (
        <BookExpanded
          book={book}
          wishSlot={renderWish?.(24)}
          onCollapse={() => setExpanded(false)}
        />
      ) : (
        <BookListItem
          book={book}
          wishSlot={renderWish?.(16)}
          onExpand={() => setExpanded(true)}
        />
      )}
    </li>
  );
}
