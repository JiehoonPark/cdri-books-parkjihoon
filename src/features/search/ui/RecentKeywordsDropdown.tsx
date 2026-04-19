import { CloseIcon } from '../../../shared/ui/icons';
import { useRecentKeywordsStore } from '../model/recentKeywordsStore';

interface RecentKeywordsDropdownProps {
  onSelect: (keyword: string) => void;
}

export function RecentKeywordsDropdown({
  onSelect,
}: RecentKeywordsDropdownProps) {
  const keywords = useRecentKeywordsStore((state) => state.keywords);
  const remove = useRecentKeywordsStore((state) => state.remove);

  if (keywords.length === 0) return null;

  return (
    <ul
      role="listbox"
      aria-label="최근 검색어"
      className="absolute left-0 top-full z-40 mt-2 w-[480px] overflow-hidden rounded-2xl bg-white py-2 shadow-[0_4px_14px_6px_rgba(151,151,151,0.15)]"
    >
      {keywords.map((keyword) => (
        <li
          key={keyword}
          className="flex items-center justify-between px-5 py-2 hover:bg-light-gray/40"
        >
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onSelect(keyword)}
            className="flex-1 text-left text-body2 text-text-primary"
          >
            {keyword}
          </button>
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => remove(keyword)}
            aria-label={`${keyword} 삭제`}
            className="ml-3 shrink-0 text-text-subtitle hover:text-text-secondary"
          >
            <CloseIcon size={14} />
          </button>
        </li>
      ))}
    </ul>
  );
}
