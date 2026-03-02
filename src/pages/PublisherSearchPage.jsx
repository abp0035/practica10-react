import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import { getPublishers, searchPublishers } from '../services/service';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const PublisherSearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q');
    const page = Number(searchParams.get('page')) || 1;

    const [publishers, setPublishers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchPromise = query
            ? searchPublishers(query, page)
            : getPublishers(page);

        fetchPromise.then(res => {
            setPublishers(res.data.results);
            setTotalPages(Math.ceil(res.data.count / 20));
            setLoading(false);
        });
    }, [query, page]);

    const handleSearch = (term) => {
        setSearchParams({ q: term });
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="text-center space-y-6 pt-8 pb-4">
                <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight">
                    {query ? (
                        <>Publishers: <span className="text-accent-cyan">"{query}"</span></>
                    ) : (
                        <>Explorar <span className="text-accent-purple">Publishers</span></>
                    )}
                </h1>
                <p className="text-text-secondary text-lg">Descubre publishers y sus catálogos de juegos</p>
                <div className="w-full mx-auto px-4">
                    <SearchBar onSearch={handleSearch} initialValue={query || ''} />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-64 bg-bg-secondary rounded-2xl animate-pulse border border-bg-tertiary"></div>
                    ))}
                </div>
            ) : publishers.length === 0 ? (
                <div className="text-center py-20 space-y-4 opacity-70">
                    <svg className="w-24 h-24 mx-auto text-bg-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    <p className="text-text-secondary text-xl font-medium">No se encontraron publishers.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {publishers.map(pub => (
                            <Link
                                key={pub.id}
                                to={`/publisher/${pub.id}`}
                                className="group block bg-bg-secondary rounded-2xl overflow-hidden border border-bg-tertiary transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent-purple/10 hover:border-accent-purple/50"
                            >
                                <div className="relative h-40 overflow-hidden">
                                    <img
                                        src={pub.image_background || 'https://via.placeholder.com/600x400?text=Sin+Imagen'}
                                        alt={pub.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent"></div>
                                </div>
                                <div className="p-5 space-y-3">
                                    <h3 className="text-lg font-bold text-text-main group-hover:text-accent-purple transition-colors line-clamp-1">
                                        {pub.name}
                                    </h3>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-text-muted flex items-center gap-1.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                            {pub.games_count || 0} juegos
                                        </span>
                                    </div>
                                    {pub.games?.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-bg-tertiary">
                                            {pub.games.slice(0, 3).map(g => (
                                                <span key={g.id} className="text-xs text-text-secondary bg-bg-tertiary px-2 py-0.5 rounded-md border border-white/5">
                                                    {g.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Pagination totalPages={totalPages} />
                </>
            )}
        </div>
    );
};

export default PublisherSearchPage;
