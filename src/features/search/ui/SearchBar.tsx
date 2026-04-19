import { useEffect, useRef, useState, type FormEvent } from 'react';
import { SearchIcon } from '../../../shared/ui/icons';
import { Button } from '../../../shared/ui/Button';
import { useSearchQuery } from '../model/useSearchQuery';
import { useRecentKeywordsStore } from '../model/recentKeywordsStore';
import { RecentKeywordsDropdown } from './RecentKeywordsDropdown';

interface SearchBarProps {
  onAdvancedClick?: () => void;
}

export function SearchBar({ onAdvancedClick }: SearchBarProps) {
  const { query, submit } = useSearchQuery();
  const addKeyword = useRecentKeywordsStore((state) => state.add);
  const [input, setInput] = useState(query);
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInput(query);
  }, [query]);

  useEffect(() => {
    if (!focused) return;
    const handleClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
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

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="도서 검색"
      className="flex items-center gap-4"
    >
      <div ref={wrapperRef} className="relative">
        <div className="flex h-[50px] w-[480px] items-center gap-[11px] rounded-full bg-light-gray px-5">
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
        {focused && (
          <RecentKeywordsDropdown
            onSelect={(keyword) => {
              setInput(keyword);
              executeSearch(keyword);
            }}
          />
        )}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onAdvancedClick}
        aria-label="상세 검색 열기"
      >
        상세검색
      </Button>
    </form>
  );
}
