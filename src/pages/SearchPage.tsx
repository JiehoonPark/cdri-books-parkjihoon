import { useMemo } from 'react';
import { SearchBar } from '../features/search/ui/SearchBar';
import { SearchResultCount } from '../features/search/ui/SearchResultCount';
import { SearchResultList } from '../features/search/ui/SearchResultList';
import { useSearchQuery } from '../features/search/model/useSearchQuery';
import { useBookSearch } from '../features/search/model/useBookSearch';
import { Button } from '../shared/ui/Button';
import { ErrorState } from '../shared/ui/ErrorState';

export function SearchPage() {
  const { query, target } = useSearchQuery();
  const {
    data,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useBookSearch({ query, target });

  const documents = useMemo(
    () => data?.pages.flatMap((page) => page.documents) ?? [],
    [data],
  );
  const totalCount = data?.pages[0]?.meta.total_count ?? 0;
  const isLoadingInitial = isFetching && !data;

  return (
    <section aria-label="도서 검색">
      <h1 className="text-title2 text-text-title">도서 검색</h1>
      <div className="mt-4">
        <SearchBar />
      </div>
      {query && (
        <div className="mt-10 space-y-6">
          <SearchResultCount label="도서 검색 결과" total={totalCount} />
          {isError ? (
            <ErrorState onRetry={() => refetch()} />
          ) : (
            <>
              <SearchResultList
                documents={documents}
                isLoading={isLoadingInitial}
              />
              {hasNextPage && (
                <div className="flex justify-center pt-6">
                  <Button
                    variant="subtle"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? '불러오는 중...' : '더보기'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
