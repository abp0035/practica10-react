import { useState, useEffect } from 'react';
import { getPopularGames } from '../services/rawgService';
import { Link } from 'react-router-dom';

const Carousel = () => {
    const [games, setGames] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPopularGames()
            .then(response => {
                setGames(response.data.results.slice(0, 6));
                setLoading(false);
            })
            .catch(error => {
                console.error("Error loading carousel games:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (games.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [games]);

    if (loading) {
        return (
            <div className="w-full h-[450px] md:h-[600px] bg-bg-secondary animate-pulse rounded-3xl border border-bg-tertiary flex items-center justify-center">
                <span className="text-text-secondary font-bold">Cargando juegos destacados...</span>
            </div>
        );
    }

    if (games.length === 0) return null;

    const currentGame = games[currentIndex];

    return (
        <div className="relative w-full h-[450px] md:h-[600px] rounded-3xl overflow-hidden border border-bg-tertiary shadow-2xl group">
            <div className="absolute inset-0">
                <img
                    src={currentGame.background_image}
                    alt={currentGame.name}
                    className="w-full h-full object-cover transition-opacity duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-bg-main/80 via-transparent to-transparent"></div>
            </div>

            <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3 lg:w-1/2 z-10 space-y-4">
                <span className="inline-block px-3 py-1 bg-accent-purple text-bg-main font-black text-xs uppercase tracking-widest rounded-full">
                    Tendencia
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-text-main line-clamp-2 drop-shadow-2xl">
                    {currentGame.name}
                </h2>
                <div className="flex items-center gap-4 text-sm font-bold">
                    <span className="flex items-center gap-1 text-status-rating">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        {currentGame.rating}
                    </span>
                    <span className="text-text-secondary">|</span>
                    <span className="text-text-secondary uppercase">{currentGame.released ? currentGame.released.split('-')[0] : 'N/D'}</span>
                </div>

                <Link
                    to={`/game/${currentGame.id}`}
                    className="inline-flex items-center gap-2 bg-text-main text-bg-main font-black px-8 py-3 rounded-xl hover:bg-accent-purple hover:text-text-main transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl"
                >
                    VER DETALLES
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length)}
                    className="p-3 rounded-full bg-bg-secondary/40 backdrop-blur-md border border-bg-tertiary text-text-main hover:bg-accent-purple hover:border-accent-purple transition-all"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length)}
                    className="p-3 rounded-full bg-bg-secondary/40 backdrop-blur-md border border-bg-tertiary text-text-main hover:bg-accent-purple hover:border-accent-purple transition-all"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>

            <div className="absolute bottom-8 right-8 md:right-16 flex gap-2">
                {games.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`transition-all duration-300 rounded-full h-1.5 ${index === currentIndex ? 'w-8 bg-accent-purple' : 'w-2 bg-text-muted hover:bg-text-secondary'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
