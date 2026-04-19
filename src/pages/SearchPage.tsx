import { useMemo } from 'react';
import { SearchBar } from '../features/search/ui/SearchBar';
import { SearchResultCount } from '../features/search/ui/SearchResultCount';
import { SearchResultList } from '../features/search/ui/SearchResultList';
import { useSearchQuery } from '../features/search/model/useSearchQuery';
import { useBookSearch } from '../features/search/model/useBookSearch';
import { useInfiniteScroll } from '../features/search/model/useInfiniteScroll';
import { ErrorState } from '../shared/ui/ErrorState';
import { Skeleton } from '../shared/ui/Skeleton';

export function SearchPage() {
  const { query, target, submit } = useSearchQuery();
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

  const sentinelRef = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <section aria-label="도서 검색">
      <h1 className="h-9 text-title2 text-text-title">도서 검색</h1>
      <div className="mt-4">
        <SearchBar
          onAdvancedSubmit={(nextTarget, nextQuery) =>
            submit({ query: nextQuery, target: nextTarget })
          }
        />
      </div>
      {query && (
        <div className="mt-6 space-y-9">
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
                <>
                  <div ref={sentinelRef} aria-hidden />
                  {isFetchingNextPage && (
                    <div
                      aria-busy="true"
                      aria-label="다음 페이지 불러오는 중"
                    >
                      <Skeleton className="h-[100px]" />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
