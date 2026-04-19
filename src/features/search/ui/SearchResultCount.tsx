interface SearchResultCountProps {
  label: string;
  total: number;
}

export function SearchResultCount({ label, total }: SearchResultCountProps) {
  return (
    <p className="flex items-baseline gap-4 text-[16px] leading-6 text-text-primary">
      <span className="font-medium">{label}</span>
      <span>
        총 <strong className="font-normal">{total.toLocaleString('ko-KR')}</strong>건
      </span>
    </p>
  );
}
