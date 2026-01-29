import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import GameDetailPage from './pages/GameDetailPage';

// Placeholder while implementing other pages
const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <h2 className="text-3xl font-bold text-text-secondary">{title} Coming Soon</h2>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="game/:id" element={<GameDetailPage />} />
          <Route path="*" element={<Placeholder title="404 - Página no Encontrada" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
