import { useInfiniteQuery } from '@tanstack/react-query';
import { searchBooks } from '../api/searchBooks';
import type { BookSearchTarget } from '../../../entities/book/types';

const MAX_KAKAO_PAGE = 50;

interface UseBookSearchParams {
  query: string;
  target?: BookSearchTarget;
}

export function useBookSearch({ query, target }: UseBookSearchParams) {
  return useInfiniteQuery({
    queryKey: ['books', 'search', query, target] as const,
    queryFn: ({ pageParam }) => searchBooks({ query, target, page: pageParam }),
    enabled: Boolean(query),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.meta.is_end) return undefined;
      const nextPage = allPages.length + 1;
      return nextPage > MAX_KAKAO_PAGE ? undefined : nextPage;
    },
  });
}
