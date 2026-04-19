export interface KakaoBook {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
}

export interface KakaoSearchMeta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

export interface KakaoBookSearchResponse {
  meta: KakaoSearchMeta;
  documents: KakaoBook[];
}

export type BookSearchTarget = 'title' | 'isbn' | 'publisher' | 'person';
