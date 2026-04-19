import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Providers } from './providers';
import { AppHeader } from '../widgets/AppHeader';
import { SearchPage } from '../pages/SearchPage';
import { PATHS } from '../shared/routes/paths';
import { ErrorBoundary } from '../shared/ui/ErrorBoundary';

const WishlistPage = lazy(() =>
  import('../pages/WishlistPage').then((module) => ({
    default: module.WishlistPage,
  })),
);

export function App() {
  return (
    <Providers>
      <div className="min-h-full bg-white">
        <AppHeader />
        <main className="mx-auto max-w-[960px] py-20">
          <ErrorBoundary>
            <Suspense fallback={null}>
              <Routes>
                <Route path={PATHS.home} element={<SearchPage />} />
                <Route path={PATHS.wishlist} element={<WishlistPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </Providers>
  );
}
