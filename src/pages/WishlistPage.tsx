import { useWishlistStore } from '../features/wishlist/model/wishlistStore';
import { WishButton } from '../features/wishlist/ui/WishButton';
import { WishlistCount } from '../features/wishlist/ui/WishlistCount';
import { BookRow } from '../entities/book/ui/BookRow';
import { EmptyState } from '../shared/ui/EmptyState';

export function WishlistPage() {
  const items = useWishlistStore((state) => state.items);

  return (
    <section aria-label="내가 찜한 책">
      <h1 className="h-8 text-[22px] leading-8 font-bold text-text-title">
        내가 찜한 책
      </h1>
      <div className="mt-4">
        <WishlistCount total={items.length} />
      </div>
      <div className="mt-6">
        {items.length === 0 ? (
          <EmptyState message="찜한 책이 없습니다." />
        ) : (
          <ul aria-label="찜한 책 목록">
            {items.map((book) => (
              <BookRow
                key={book.isbn || book.url}
                book={book}
                renderWish={(size) => <WishButton book={book} size={size} />}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
