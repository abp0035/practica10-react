import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchGamesAsync, fetchPopularGames } from '../store/slices/gamesSlice';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q');
    const page = Number(searchParams.get('page')) || 1;

    const dispatch = useDispatch();

    const {
        searchResults: searchedGames,
        popularGames,
        status,
        error
    } = useSelector(state => state.games);

    const isSearchMode = !!query;
    // Ojo: Esto asume que gamesSlice gestiona la respuesta paginada o trae suficientes para verlos
    const games = isSearchMode ? searchedGames : popularGames;
    // Mocking el totalPages para no romper el Pagination que trae el remoto aunque Redux no lo guarde de base.
    const totalPages = Math.ceil(500 / 20);

    const performSearch = (searchTerm, pageNum) => {
        if (searchTerm) {
            dispatch(searchGamesAsync(searchTerm)); // Ojo si searchGamesAsync no acepta page
        } else {
            dispatch(fetchPopularGames());
        }
    };

    useEffect(() => {
        performSearch(query, page);
    }, [query, page, dispatch]);

    const handleSearch = (term) => {
        setSearchParams({ q: term });
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="text-center space-y-6 pt-8 pb-4">
                <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight">
                    {query ? (
                        <>Resultados para <span className="text-accent-cyan">"{query}"</span></>
                    ) : (
                        <>Galería de <span className="text-accent-purple">Juegos</span></>
                    )}
                </h1>
                <p className="text-text-secondary text-lg">Explora nuestra colección o busca tu título favorito</p>
                <div className="w-full mx-auto px-4">
                    <SearchBar onSearch={handleSearch} initialValue={query || ''} />
                </div>
            </div>

            {status === 'loading' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="aspect-[3/4] bg-bg-secondary rounded-2xl animate-pulse border border-bg-tertiary"></div>
                    ))}
                </div>
            ) : status === 'failed' ? (
                <div className="text-center bg-status-error/10 border border-status-error/20 rounded-2xl p-10 max-w-lg mx-auto">
                    <p className="text-status-error font-bold text-xl mb-2">Error</p>
                    <p className="text-text-secondary">{error}</p>
                </div>
            ) : games.length === 0 ? (
                <div className="text-center py-20 space-y-4 opacity-70">
                    <svg className="w-24 h-24 mx-auto text-bg-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-text-secondary text-xl font-medium">No encontramos juegos con ese nombre.</p>
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

export default SearchPage;
