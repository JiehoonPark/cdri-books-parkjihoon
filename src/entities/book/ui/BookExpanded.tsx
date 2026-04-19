import { memo, type ReactNode } from 'react';
import type { KakaoBook } from '../types';
import { formatAuthors } from '../lib/formatAuthors';
import { BookThumbnail } from './BookThumbnail';
import { BookPrice } from './BookPrice';
import { Button } from '../../../shared/ui/Button';
import { ChevronUp } from '../../../shared/ui/icons';
import { openExternalLink } from '../../../shared/lib/openExternalLink';

interface BookExpandedProps {
  book: KakaoBook;
  wishSlot?: ReactNode;
  onCollapse: () => void;
}

function BookExpandedView({ book, wishSlot, onCollapse }: BookExpandedProps) {
  const handleBuy = () => openExternalLink(book.url);

  return (
    <div className="flex gap-8 py-6 pl-[54px] pr-5">
        <div className="relative shrink-0">
          <BookThumbnail
            src={book.thumbnail}
            alt={book.title}
            className="h-[280px] w-[210px]"
          />
          {wishSlot && (
            <div className="absolute right-2 top-2">{wishSlot}</div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-baseline gap-4 pt-5">
              <h3 className="text-[18px] leading-[26px] font-bold text-text-primary">
                {book.title}
              </h3>
              <span className="truncate text-[14px] leading-[22px] font-medium text-text-subtitle">
                {formatAuthors(book.authors)}
              </span>
            </div>
            <Button
              variant="subtle"
              onClick={onCollapse}
              aria-label="상세보기 접기"
            >
              상세보기
              <ChevronUp className="text-ui-gray" />
            </Button>
          </div>

          <section className="mt-4 flex-1 overflow-hidden">
            <h4 className="text-[14px] leading-[26px] font-bold text-text-primary">
              책 소개
            </h4>
            <p className="mt-3 whitespace-pre-wrap text-small leading-4 text-text-primary">
              {book.contents || '소개글이 제공되지 않습니다.'}
            </p>
          </section>

          <div className="mt-4 flex flex-col items-end gap-3">
            <BookPrice price={book.price} salePrice={book.sale_price} />
            <Button size="lg" onClick={handleBuy}>
              구매하기
            </Button>
          </div>
        </div>
    </div>
  );
}

export const BookExpanded = memo(BookExpandedView);
