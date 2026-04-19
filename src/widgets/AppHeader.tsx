import { NavLink } from 'react-router-dom';
import { cn } from '../shared/lib/cn';
import { PATHS } from '../shared/routes/paths';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex h-full items-center text-body1 text-text-primary transition-colors',
    isActive
      ? 'border-b border-primary'
      : 'border-b border-transparent hover:text-text-title',
  );

export function AppHeader() {
  return (
    <header className="relative h-20 border-b border-divider bg-white">
      <NavLink
        to={PATHS.home}
        className="absolute left-[160px] top-1/2 -translate-y-1/2 text-title1 text-text-primary"
        aria-label="CERTICOS BOOKS 홈으로"
      >
        CERTICOS BOOKS
      </NavLink>
      <nav
        aria-label="주요 메뉴"
        className="absolute left-1/2 top-0 flex h-full -translate-x-1/2 items-center gap-14"
      >
        <NavLink to={PATHS.home} end className={navLinkClass}>
          도서 검색
        </NavLink>
        <NavLink to={PATHS.wishlist} className={navLinkClass}>
          내가 찜한 책
        </NavLink>
      </nav>
    </header>
  );
}
