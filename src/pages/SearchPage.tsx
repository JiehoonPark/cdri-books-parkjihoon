import { useMemo } from 'react';
import { SearchBar } from '../features/search/ui/SearchBar';
import { SearchResultCount } from '../features/search/ui/SearchResultCount';
import { SearchResultList } from '../features/search/ui/SearchResultList';
import { useSearchQuery } from '../features/search/model/useSearchQuery';
import { useBookSearch } from '../features/search/model/useBookSearch';

export function SearchPage() {
  const { query, target } = useSearchQuery();
  const { data, isFetching } = useBookSearch({ query, target });

  const documents = useMemo(
    () => data?.pages.flatMap((page) => page.documents) ?? [],
    [data],
  );
  const totalCount = data?.pages[0]?.meta.total_count ?? 0;

  return (
    <section aria-label="도서 검색">
      <h1 className="text-title2 text-text-title">도서 검색</h1>
      <div className="mt-4">
        <SearchBar />
      </div>
      {query && (
        <div className="mt-10 space-y-6">
          <SearchResultCount label="도서 검색 결과" total={totalCount} />
          <SearchResultList
            documents={documents}
            isLoading={isFetching && !data}
          />
        </div>
      )}
    </section>
  );
}
