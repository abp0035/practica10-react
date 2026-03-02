import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router';
import { getPublisherDetails, getGamesByPublisher } from '../services/service';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';

const PublisherPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;

    const [publisher, setPublisher] = useState(null);
    const [games, setGames] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            getPublisherDetails(id),
            getGamesByPublisher(id, page)
        ]).then(([pubRes, gamesRes]) => {
            setPublisher(pubRes.data);
            setGames(gamesRes.data.results);
            setTotalPages(Math.ceil(gamesRes.data.count / 20));
            setLoading(false);
        });
    }, [id, page]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-bg-tertiary border-t-accent-purple rounded-full animate-spin"></div>
                <p className="text-text-secondary font-medium animate-pulse">Cargando publisher...</p>
            </div>
        </div>
    );

    if (!publisher) return (
        <div className="text-center py-20">
            <h2 className="text-3xl font-bold mb-4 text-status-error">Publisher no encontrado</h2>
            <button
                onClick={() => navigate(-1)}
                className="text-accent-cyan hover:text-accent-purple underline transition-colors"
            >
                Volver atrás
            </button>
        </div>
    );

    return (
        <div className="animate-in fade-in duration-700 pb-20">
            {/* Hero section */}
            <div className="relative w-full min-h-[300px] bg-gradient-to-br from-accent-purple/20 via-bg-main to-accent-cyan/10 overflow-hidden">
                {publisher.image_background && (
                    <>
                        <img
                            src={publisher.image_background}
                            alt={publisher.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/60 to-transparent"></div>
                    </>
                )}

                <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center">
                    <span className="text-accent-cyan text-sm font-bold uppercase tracking-widest mb-4">Publisher</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-6 drop-shadow-2xl">
                        {publisher.name}
                    </h1>
                    <div className="flex items-center gap-6 text-text-secondary">
                        <span className="flex items-center gap-2 bg-black/30 backdrop-blur px-4 py-2 rounded-xl border border-white/10">
                            <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            <span className="font-bold">{publisher.games_count || 0}</span> juegos
                        </span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-10 space-y-10">
                {/* Description */}
                {publisher.description && (
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3 border-b border-bg-tertiary pb-4">
                            <span className="w-2 h-8 bg-accent-pink rounded-full"></span>
                            Sobre el publisher
                        </h3>
                        <div
                            className="prose prose-invert prose-lg max-w-none text-text-secondary leading-relaxed p-8 bg-bg-secondary rounded-3xl border border-bg-tertiary"
                            dangerouslySetInnerHTML={{ __html: publisher.description }}
                        />
                    </div>
                )}

                {/* Games grid */}
                <div>
                    <h3 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3 border-b border-bg-tertiary pb-4">
                        <span className="w-2 h-8 bg-accent-cyan rounded-full"></span>
                        Juegos de {publisher.name}
                    </h3>
                    {games.length === 0 ? (
                        <p className="text-text-secondary text-center py-10">No se encontraron juegos.</p>
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
            </div>
        </div>
    );
};

export default PublisherPage;
