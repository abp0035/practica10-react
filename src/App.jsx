import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import GameDetailPage from './pages/GameDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import EventsPage from './pages/EventsPage';
import MyEventsPage from './pages/MyEventsPage';
import TagPage from './pages/TagPage';
import GenrePage from './pages/GenrePage';
import PublisherPage from './pages/PublisherPage';
import PublisherSearchPage from './pages/PublisherSearchPage';

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
          <Route path="tag/:slug" element={<TagPage />} />
          <Route path="genre/:slug" element={<GenrePage />} />
          <Route path="publisher/:id" element={<PublisherPage />} />
          <Route path="publishers" element={<PublisherSearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

