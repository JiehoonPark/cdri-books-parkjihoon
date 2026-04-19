interface WishlistCountProps {
  total: number;
}

export function WishlistCount({ total }: WishlistCountProps) {
  return (
    <p className="flex items-baseline gap-4 text-[16px] leading-6 text-text-primary">
      <span className="font-medium">찜한 책</span>
      <span>
        총{' '}
        <strong className="font-bold text-primary">
          {total.toLocaleString('ko-KR')}
        </strong>
        건
      </span>
    </p>
  );
}
