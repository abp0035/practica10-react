import { useSelector } from 'react-redux';
import GameCard from '../components/GameCard';

const FavoritesPage = () => {
    const favorites = useSelector(state => state.games.favorites);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-black mb-8">Mis Favoritos</h1>

            {favorites.length === 0 ? (
                <div className="text-center py-20 bg-bg-secondary rounded-2xl border border-bg-tertiary">
                    <p className="text-xl text-text-secondary">Aún no has añadido ningún juego a favoritos.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favorites.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
