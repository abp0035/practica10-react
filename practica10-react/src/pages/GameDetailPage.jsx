import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGameDetails } from '../services/rawgservice';

const GameDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setLoading(true);
        getGameDetails(id)
            .then(res => {
                setGame(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching details:", err);
                setLoading(false);
            });
    }, [id]);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-bg-tertiary border-t-accent-purple rounded-full animate-spin"></div>
                <p className="text-text-secondary font-medium animate-pulse">Cargando detalles...</p>
            </div>
        </div>
    );

    if (!game) return (
        <div className="text-center py-20">
            <h2 className="text-3xl font-bold mb-4 text-status-error">Juego no encontrado</h2>
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
            {/* FULL WIDTH BANNER */}
            <div className="relative w-full h-[60vh] min-h-[400px]">
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-bg-main/70 via-transparent to-transparent"></div>

                {/* Banner Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                    <div className="container mx-auto">
                        <button
                            onClick={() => navigate(-1)}
                            className="absolute top-10 left-4 md:left-10 mb-6 inline-flex items-center gap-2 text-white hover:text-accent-cyan transition-colors bg-black/30 backdrop-blur px-4 py-2 rounded-full border border-white/10 hover:bg-black/50"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Volver
                        </button>

                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            {game.released && (
                                <span className="font-mono text-accent-cyan bg-black/40 backdrop-blur px-3 py-1 rounded-md text-sm border border-accent-cyan/30">
                                    {game.released}
                                </span>
                            )}
                            {game.esrb_rating && (
                                <span className="font-bold text-white border border-white/30 px-2 py-1 rounded text-xs bg-black/40 backdrop-blur">
                                    {game.esrb_rating.name}
                                </span>
                            )}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-6 drop-shadow-2xl">
                            {game.name}
                        </h1>

                        <div className="flex flex-wrap gap-3 mb-8">
                            {game.genres?.map(g => (
                                <span key={g.id} className="px-5 py-2 bg-accent-purple text-text-main rounded-full text-sm font-bold tracking-wide shadow-lg shadow-accent-purple/20">
                                    {g.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT CONTAINER */}
            <div className="container mx-auto px-4 -mt-8 relative z-10">
                <div className="grid lg:grid-cols-[1fr_350px] gap-10">

                    {/* Left Column: Description & Actions */}
                    <div className="space-y-10">
                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                onClick={toggleFavorite}
                                className={`flex-1 md:flex-none px-8 py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 shadow-xl ${isFavorite
                                        ? 'bg-status-error text-white hover:bg-red-600 ring-4 ring-red-500/20'
                                        : 'bg-white text-bg-main hover:bg-gray-100'
                                    }`}
                            >
                                <svg className={`h-6 w-6 transition-transform ${isFavorite ? 'fill-current scale-110' : 'fill-none scale-100'}`} viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span>{isFavorite ? 'Favorito' : 'Añadir a Favoritos'}</span>
                            </button>

                            {game.website && (
                                <a
                                    href={game.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-6 py-4 rounded-xl font-bold text-text-main border-2 border-bg-tertiary hover:border-text-main transition-colors bg-bg-secondary"
                                >
                                    Web Oficial ↗
                                </a>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3 border-b border-bg-tertiary pb-4">
                                <span className="w-2 h-8 bg-accent-pink rounded-full"></span>
                                Sobre el juego
                            </h3>
                            <div
                                className="prose prose-invert prose-lg max-w-none text-text-secondary leading-relaxed p-8 bg-bg-secondary rounded-3xl border border-bg-tertiary"
                                dangerouslySetInnerHTML={{ __html: game.description }}
                            />
                        </div>
                    </div>

                    {/* Right Column: Sidebar Stats */}
                    <div className="space-y-6">
                        <div className="bg-bg-secondary rounded-3xl p-8 border border-bg-tertiary space-y-8 sticky top-24 shadow-2xl">
                            <h3 className="text-xl font-bold text-text-main border-b border-bg-tertiary pb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Información
                            </h3>

                            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                <div>
                                    <h4 className="text-text-muted text-xs uppercase tracking-widest font-bold mb-2">Valoración</h4>
                                    <div className="flex items-end gap-1">
                                        <span className="text-4xl font-black text-status-rating">{game.rating}</span>
                                        <span className="text-text-muted mb-1 text-sm font-bold">/ 5</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-text-muted text-xs uppercase tracking-widest font-bold mb-2">Metascore</h4>
                                    <div className={`text-4xl font-black ${!game.metacritic ? 'text-text-muted' : game.metacritic >= 75 ? 'text-status-success' : 'text-status-warning'}`}>
                                        {game.metacritic || 'N/A'}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-text-muted text-xs uppercase tracking-widest font-bold mb-2">Duración</h4>
                                    <div className="text-xl font-bold text-text-main">
                                        {game.playtime || 0} h
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-text-muted text-xs uppercase tracking-widest font-bold mb-2">Votos</h4>
                                    <div className="text-xl font-bold text-text-main">
                                        {game.ratings_count || 0}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-bg-tertiary">
                                <h4 className="text-text-muted text-xs uppercase tracking-widest font-bold mb-4">Plataformas</h4>
                                <div className="flex flex-wrap gap-2">
                                    {game.platforms?.map(p => (
                                        <span key={p.platform.id} className="text-xs font-bold bg-bg-tertiary px-3 py-1.5 rounded-lg text-text-secondary border border-white/5 hover:text-text-main hover:border-text-muted transition-colors cursor-default">
                                            {p.platform.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {game.developers?.length > 0 && (
                                <div className="pt-6 border-t border-bg-tertiary">
                                    <h4 className="text-text-muted text-xs uppercase tracking-widest font-bold mb-3">Desarrolladores</h4>
                                    <div className="flex flex-col gap-1">
                                        {game.developers.map(d => (
                                            <span key={d.id} className="text-sm text-text-main font-medium">{d.name}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GameDetailPage;
