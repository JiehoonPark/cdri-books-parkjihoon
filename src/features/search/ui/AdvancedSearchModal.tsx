import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Button } from '../../../shared/ui/Button';
import { CloseIcon, ChevronDown } from '../../../shared/ui/icons';
import type { BookSearchTarget } from '../../../entities/book/types';

interface AdvancedSearchModalProps {
  onClose: () => void;
  onSubmit: (target: BookSearchTarget, query: string) => void;
}

interface TargetOption {
  value: BookSearchTarget;
  label: string;
}

const TARGET_OPTIONS: TargetOption[] = [
  { value: 'title', label: '제목' },
  { value: 'person', label: '저자명' },
  { value: 'publisher', label: '출판사' },
];

export function AdvancedSearchModal({
  onClose,
  onSubmit,
}: AdvancedSearchModalProps) {
  const [target, setTarget] = useState<BookSearchTarget>('title');
  const [query, setQuery] = useState('');
  const [selectOpen, setSelectOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const handleClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSubmit(target, trimmed);
    onClose();
  };

  const currentLabel =
    TARGET_OPTIONS.find((option) => option.value === target)?.label ?? '제목';

  return (
    <div
      ref={wrapperRef}
      role="dialog"
      aria-modal="true"
      aria-label="상세 검색"
      className="absolute right-0 top-full z-50 mt-3 w-[360px] rounded-lg bg-white p-6 shadow-[0_4px_14px_6px_rgba(151,151,151,0.15)]"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="상세검색 닫기"
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center text-text-subtitle hover:text-text-secondary"
      >
        <CloseIcon size={20} />
      </button>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex items-start gap-5">
          <div className="relative w-[100px] shrink-0">
            <button
              type="button"
              onClick={() => setSelectOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={selectOpen}
              className="flex h-9 w-full items-center justify-between border-b border-divider text-[14px] font-bold text-text-primary"
            >
              <span>{currentLabel}</span>
              <ChevronDown size={14} className="text-text-subtitle" />
            </button>
            {selectOpen && (
              <ul
                role="listbox"
                className="absolute left-0 top-full z-10 mt-1 w-full overflow-hidden rounded bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)]"
              >
                {TARGET_OPTIONS.filter((option) => option.value !== target).map(
                  (option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => {
                          setTarget(option.value);
                          setSelectOpen(false);
                        }}
                        className="flex h-[30px] w-full items-center px-3 text-[14px] font-medium text-text-subtitle hover:bg-light-gray"
                      >
                        {option.label}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            )}
          </div>

          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="검색어 입력"
            aria-label="상세 검색어"
            autoFocus
            className="h-9 flex-1 border-b border-primary bg-transparent text-[14px] text-text-primary placeholder:text-text-subtitle focus:outline-none"
          />
        </div>

        <Button type="submit" size="sm" className="w-full">
          검색하기
        </Button>
      </form>
    </div>
  );
}
