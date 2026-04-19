import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_KEYWORDS = 8;

interface RecentKeywordsState {
  keywords: string[];
  add: (keyword: string) => void;
  remove: (keyword: string) => void;
  clear: () => void;
}

export const useRecentKeywordsStore = create<RecentKeywordsState>()(
  persist(
    (set) => ({
      keywords: [],
      add: (keyword) =>
        set((state) => {
          const trimmed = keyword.trim();
          if (!trimmed) return state;
          const deduped = state.keywords.filter((item) => item !== trimmed);
          return { keywords: [trimmed, ...deduped].slice(0, MAX_KEYWORDS) };
        }),
      remove: (keyword) =>
        set((state) => ({
          keywords: state.keywords.filter((item) => item !== keyword),
        })),
      clear: () => set({ keywords: [] }),
    }),
    {
      name: 'cdri-books-recent-keywords',
      version: 1,
    },
  ),
);
