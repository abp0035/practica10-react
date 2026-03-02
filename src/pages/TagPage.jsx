import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { getGamesByTag } from '../services/service';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';

const TagPage = () => {
    const { slug } = useParams();
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;

    const [games, setGames] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getGamesByTag(slug, page)
            .then(res => {
                setGames(res.data.results);
                setTotalPages(Math.ceil(res.data.count / 20));
                setLoading(false);
            });
    }, [slug, page]);

    const tagName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="text-center space-y-4 pt-8 pb-4">
                <p className="text-accent-cyan text-sm font-bold uppercase tracking-widest">Etiqueta</p>
                <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight">
                    {tagName}
                </h1>
                <p className="text-text-secondary text-lg">
                    Juegos con la etiqueta <span className="text-accent-purple font-semibold">"{tagName}"</span>
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="aspect-[3/4] bg-bg-secondary rounded-2xl animate-pulse border border-bg-tertiary"></div>
                    ))}
                </div>
            ) : games.length === 0 ? (
                <div className="text-center py-20 space-y-4 opacity-70">
                    <p className="text-text-secondary text-xl font-medium">No se encontraron juegos con esta etiqueta.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {games.map(game => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                    <Pagination totalPages={totalPages} />
                </>
            )}
        </div>
    );
};

export default TagPage;
