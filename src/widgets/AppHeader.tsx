import { NavLink } from 'react-router-dom';
import { cn } from '../shared/lib/cn';
import { PATHS } from '../shared/routes/paths';

interface NavItemProps {
  to: string;
  end?: boolean;
  children: string;
}

function NavItem({ to, end, children }: NavItemProps) {
  return (
    <NavLink to={to} end={end} className="flex h-full items-center">
      {({ isActive }) => (
        <span
          className={cn(
            'box-content block h-[26.67px] border-b pb-[2.33px] text-body1 text-text-primary transition-colors',
            isActive
              ? 'border-primary'
              : 'border-transparent hover:text-text-title',
          )}
        >
          {children}
        </span>
      )}
    </NavLink>
  );
}

export function AppHeader() {
  return (
    <header className="relative h-20 bg-white">
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
        <NavItem to={PATHS.home} end>
          도서 검색
        </NavItem>
        <NavItem to={PATHS.wishlist}>내가 찜한 책</NavItem>
      </nav>
    </header>
  );
}
