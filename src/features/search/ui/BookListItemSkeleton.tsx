import { Skeleton } from '../../../shared/ui/Skeleton';

export function BookListItemSkeleton() {
  return (
    <li className="border-b border-divider">
      <div className="flex h-[100px] items-center gap-12 pl-12 pr-4">
        <Skeleton className="h-[68px] w-12 shrink-0" />
        <div className="flex min-w-0 flex-1 items-baseline gap-4">
          <Skeleton className="h-[18px] w-40" />
          <Skeleton className="h-[14px] w-24" />
        </div>
        <Skeleton className="h-[18px] w-20" />
        <div className="flex gap-2">
          <Skeleton className="h-12 w-[115px]" />
          <Skeleton className="h-12 w-[115px]" />
        </div>
      </div>
    </li>
  );
}
