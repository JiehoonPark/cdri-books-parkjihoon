import type { KakaoBook } from '../../../entities/book/types';
import { BookListItem } from '../../../entities/book/ui/BookListItem';
import { EmptyState } from '../../../shared/ui/EmptyState';
import { BookListItemSkeleton } from './BookListItemSkeleton';

interface SearchResultListProps {
  documents: KakaoBook[];
  isLoading: boolean;
}

const SKELETON_COUNT = 4;

export function SearchResultList({ documents, isLoading }: SearchResultListProps) {
  if (isLoading) {
    return (
      <ul aria-busy="true" aria-label="도서 검색 결과 로딩 중">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <BookListItemSkeleton key={index} />
        ))}
      </ul>
    );
  }

  if (documents.length === 0) {
    return <EmptyState message="검색된 결과가 없습니다." />;
  }

  return (
    <ul aria-label="도서 검색 결과">
      {documents.map((book) => (
        <BookListItem
          key={book.isbn || book.url}
          book={book}
          onExpand={() => undefined}
        />
      ))}
    </ul>
  );
}
