import { useEffect, useState, type FormEvent } from 'react';
import { SearchIcon } from '../../../shared/ui/icons';
import { Button } from '../../../shared/ui/Button';
import { useSearchQuery } from '../model/useSearchQuery';

interface SearchBarProps {
  onAdvancedClick?: () => void;
}

export function SearchBar({ onAdvancedClick }: SearchBarProps) {
  const { query, submit } = useSearchQuery();
  const [input, setInput] = useState(query);

  useEffect(() => {
    setInput(query);
  }, [query]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    submit({ query: trimmed });
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="도서 검색"
      className="flex items-center gap-4"
    >
      <div className="flex h-[50px] w-[480px] items-center gap-[11px] rounded-full bg-light-gray pl-5 pr-5">
        <SearchIcon size={20} className="text-text-primary" />
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="검색어를 입력하세요"
          aria-label="도서 검색어"
          className="h-full flex-1 bg-transparent text-caption text-black outline-none placeholder:text-text-subtitle"
        />
      </div>
      <Button
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
