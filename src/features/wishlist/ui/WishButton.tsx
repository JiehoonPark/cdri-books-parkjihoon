import type { KakaoBook } from '../../../entities/book/types';
import { HeartFilled, HeartOutline } from '../../../shared/ui/icons';
import { useWishlistStore } from '../model/wishlistStore';

interface WishButtonProps {
  book: KakaoBook;
  size?: number;
}

export function WishButton({ book, size = 16 }: WishButtonProps) {
  const isWished = useWishlistStore((state) => state.isWished(book.isbn));
  const toggle = useWishlistStore((state) => state.toggle);

  const handleClick = () => toggle(book);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isWished}
      aria-label={isWished ? '찜 해제' : '찜하기'}
      className="inline-flex items-center justify-center bg-transparent"
    >
      {isWished ? (
        <HeartFilled size={size} className="text-red" />
      ) : (
        <HeartOutline size={size} className="text-gray" />
      )}
    </button>
  );
}
