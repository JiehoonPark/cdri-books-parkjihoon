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
    <ul role="listbox" aria-label="최근 검색어" className="px-5 pb-4">
      {keywords.map((keyword) => (
        <li
          key={keyword}
          className="flex items-center justify-between py-2"
        >
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onSelect(keyword)}
            className="flex-1 text-left text-caption text-text-primary"
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
            <CloseIcon size={20} />
          </button>
        </li>
      ))}
    </ul>
  );
}
