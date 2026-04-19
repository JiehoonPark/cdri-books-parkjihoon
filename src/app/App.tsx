import { Route, Routes } from 'react-router-dom';
import { Providers } from './providers';
import { SearchPage } from '../pages/SearchPage';
import { WishlistPage } from '../pages/WishlistPage';
import { PATHS } from '../shared/routes/paths';

export function App() {
  return (
    <Providers>
      <Routes>
        <Route path={PATHS.home} element={<SearchPage />} />
        <Route path={PATHS.wishlist} element={<WishlistPage />} />
      </Routes>
    </Providers>
  );
}
