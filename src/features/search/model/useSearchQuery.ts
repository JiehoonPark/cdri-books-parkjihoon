import { useSearchParams } from 'react-router-dom';
import type { BookSearchTarget } from '../../../entities/book/types';

const QUERY_KEY = 'q';
const TARGET_KEY = 'target';

interface SearchQuery {
  query: string;
  target?: BookSearchTarget;
}

interface UseSearchQueryReturn extends SearchQuery {
  submit: (next: SearchQuery) => void;
  clear: () => void;
}

export function useSearchQuery(): UseSearchQueryReturn {
  const [params, setParams] = useSearchParams();

  const query = params.get(QUERY_KEY) ?? '';
  const target = (params.get(TARGET_KEY) as BookSearchTarget | null) ?? undefined;

  const submit = ({ query: nextQuery, target: nextTarget }: SearchQuery) => {
    const next = new URLSearchParams();
    if (nextQuery) next.set(QUERY_KEY, nextQuery);
    if (nextTarget) next.set(TARGET_KEY, nextTarget);
    setParams(next);
  };

  const clear = () => setParams(new URLSearchParams());

  return { query, target, submit, clear };
}
