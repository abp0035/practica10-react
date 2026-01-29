import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    return (
        <Link to={`/game/${game.id}`} className="block group h-full">
            <div className="bg-bg-secondary rounded-2xl overflow-hidden shadow-lg border border-bg-tertiary transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-accent-purple/20 group-hover:border-accent-purple/50 h-full flex flex-col">
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden">
                    <img
                        src={game.background_image || 'https://via.placeholder.com/600x400?text=No+Image'}
                        alt={game.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-status-rating border border-status-rating/20 flex items-center gap-1">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        {game.rating}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-text-main group-hover:text-accent-purple transition-colors line-clamp-1 mb-2">
                            {game.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {game.genres?.slice(0, 3).map(g => (
                                <span key={g.id} className="text-xs font-medium text-text-secondary bg-bg-tertiary px-2 py-1 rounded-md border border-white/5">
                                    {g.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-bg-tertiary flex justify-between items-center text-sm text-text-muted">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {game.released ? game.released.split('-')[0] : 'TBA'}
                        </span>
                        {game.metacritic && (
                            <span className={`px-2 py-0.5 rounded text-xs font-bold text-bg-main ${game.metacritic >= 75 ? 'bg-status-success' :
                                    game.metacritic >= 50 ? 'bg-status-warning' : 'bg-status-error'
                                }`}>
                                {game.metacritic}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GameCard;
