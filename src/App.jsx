import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import GameDetailPage from './pages/GameDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import EventsPage from './pages/EventsPage';
import MyEventsPage from './pages/MyEventsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="game/:id" element={<GameDetailPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="my-events" element={<MyEventsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
