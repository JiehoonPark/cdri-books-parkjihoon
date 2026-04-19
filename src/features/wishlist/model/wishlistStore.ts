import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { KakaoBook } from '../../../entities/book/types';

interface WishlistState {
  items: KakaoBook[];
  toggle: (book: KakaoBook) => void;
  isWished: (isbn: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (book) =>
        set((state) => ({
          items: state.items.some((b) => b.isbn === book.isbn)
            ? state.items.filter((b) => b.isbn !== book.isbn)
            : [book, ...state.items],
        })),
      isWished: (isbn) => get().items.some((b) => b.isbn === isbn),
    }),
    {
      name: 'cdri-books-wishlist',
      version: 1,
    },
  ),
);
