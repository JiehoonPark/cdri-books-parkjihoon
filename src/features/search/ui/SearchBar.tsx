import { useEffect, useRef, useState, type FormEvent } from 'react';
import { SearchIcon } from '../../../shared/ui/icons';
import { Button } from '../../../shared/ui/Button';
import { useSearchQuery } from '../model/useSearchQuery';
import { useRecentKeywordsStore } from '../model/recentKeywordsStore';
import { RecentKeywordsDropdown } from './RecentKeywordsDropdown';
import { AdvancedSearchModal } from './AdvancedSearchModal';
import type { BookSearchTarget } from '../../../entities/book/types';

interface SearchBarProps {
  onAdvancedSubmit?: (target: BookSearchTarget, query: string) => void;
}

export function SearchBar({ onAdvancedSubmit }: SearchBarProps) {
  const { query, target, submit } = useSearchQuery();
  const addKeyword = useRecentKeywordsStore((state) => state.add);
  const keywordCount = useRecentKeywordsStore(
    (state) => state.keywords.length,
  );
  const [input, setInput] = useState(target ? '' : query);
  const [focused, setFocused] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 상세 검색(target 설정) 중엔 기본 input 비움
    // → 전체 검색과 상세 검색이 동시에 표시되지 않음
    setInput(target ? '' : query);
  }, [query, target]);

  useEffect(() => {
    if (!focused) return;
    const handleClick = (event: MouseEvent) => {
      if (
        inputWrapperRef.current &&
        !inputWrapperRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [focused]);

  const executeSearch = (keyword: string) => {
    const trimmed = keyword.trim();
    if (!trimmed) return;
    addKeyword(trimmed);
    submit({ query: trimmed });
    setFocused(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    executeSearch(input);
  };

  const handleAdvancedSubmit = (target: BookSearchTarget, keyword: string) => {
    addKeyword(keyword);
    onAdvancedSubmit?.(target, keyword);
  };

  const showDropdown = focused && keywordCount > 0;

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="도서 검색"
      className="flex items-start gap-4"
    >
      <div ref={inputWrapperRef} className="relative h-[50px] w-[480px]">
        <div className="absolute left-0 top-0 z-30 w-full overflow-hidden rounded-[25px] bg-light-gray">
          <div className="flex h-[50px] items-center gap-[11px] px-5">
            <SearchIcon
              size={20}
              className="pointer-events-none text-text-primary"
            />
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onFocus={() => setFocused(true)}
              placeholder="검색어 입력"
              aria-label="도서 검색어"
              className="h-full flex-1 bg-transparent text-caption text-black outline-none placeholder:text-text-subtitle"
            />
          </div>
          {showDropdown && (
            <RecentKeywordsDropdown
              onSelect={(keyword) => {
                setInput(keyword);
                executeSearch(keyword);
              }}
            />
          )}
        </div>
      </div>
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setAdvancedOpen((prev) => !prev)}
          aria-label="상세 검색 열기"
          aria-expanded={advancedOpen}
        >
          상세검색
        </Button>
        {advancedOpen && (
          <AdvancedSearchModal
            onClose={() => setAdvancedOpen(false)}
            onSubmit={handleAdvancedSubmit}
          />
        )}
      </div>
    </form>
  );
}
