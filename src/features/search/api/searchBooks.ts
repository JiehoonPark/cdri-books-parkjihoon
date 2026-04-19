import { kakaoClient } from '../../../shared/api/kakaoClient';
import type {
  BookSearchTarget,
  KakaoBookSearchResponse,
} from '../../../entities/book/types';

export const PAGE_SIZE = 10;

export interface SearchBooksParams {
  query: string;
  target?: BookSearchTarget;
  page?: number;
  size?: number;
}

export async function searchBooks({
  query,
  target,
  page = 1,
  size = PAGE_SIZE,
}: SearchBooksParams): Promise<KakaoBookSearchResponse> {
  const response = await kakaoClient.get<KakaoBookSearchResponse>(
    '/v3/search/book',
    {
      params: {
        query,
        target,
        page,
        size,
        sort: 'accuracy',
      },
    },
  );
  return response.data;
}
