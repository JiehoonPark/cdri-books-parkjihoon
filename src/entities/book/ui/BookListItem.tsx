import { memo, type ReactNode } from 'react';
import type { KakaoBook } from '../types';
import { formatPrice } from '../lib/formatPrice';
import { BookThumbnail } from './BookThumbnail';
import { Button } from '../../../shared/ui/Button';
import { ChevronDown } from '../../../shared/ui/icons';
import { openExternalLink } from '../../../shared/lib/openExternalLink';

interface BookListItemProps {
  book: KakaoBook;
  wishSlot?: ReactNode;
  onExpand: () => void;
}

function BookListItemView({ book, wishSlot, onExpand }: BookListItemProps) {
  const handleBuy = () => openExternalLink(book.url);

  return (
    <li className="border-b border-divider">
      <div className="flex h-[100px] items-center gap-12 pl-12 pr-4">
        <div className="relative shrink-0">
          <BookThumbnail
            src={book.thumbnail}
            alt={book.title}
            className="h-[68px] w-12"
          />
          {wishSlot && (
            <div className="absolute right-0 top-0">{wishSlot}</div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 items-baseline gap-4">
          <h3 className="truncate text-title3 text-text-primary">{book.title}</h3>
          <span className="shrink-0 text-body2 text-text-secondary">
            {book.authors.join(', ')}
          </span>
        </div>

        <p className="text-title3 text-text-primary">{formatPrice(book.price)}</p>

        <div className="flex gap-2">
          <Button onClick={handleBuy}>구매하기</Button>
          <Button variant="subtle" onClick={onExpand} aria-label="상세보기 펼치기">
            상세보기
            <ChevronDown className="text-ui-gray" />
          </Button>
        </div>
      </div>
    </li>
  );
}

export const BookListItem = memo(BookListItemView);
