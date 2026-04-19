import { Route, Routes } from 'react-router-dom';
import { Providers } from './providers';
import { AppHeader } from '../widgets/AppHeader';
import { SearchPage } from '../pages/SearchPage';
import { WishlistPage } from '../pages/WishlistPage';
import { PATHS } from '../shared/routes/paths';

export function App() {
  return (
    <Providers>
      <div className="min-h-full bg-white">
        <AppHeader />
        <main className="mx-auto max-w-[960px] py-20">
          <Routes>
            <Route path={PATHS.home} element={<SearchPage />} />
            <Route path={PATHS.wishlist} element={<WishlistPage />} />
          </Routes>
        </main>
      </div>
    </Providers>
  );
}
