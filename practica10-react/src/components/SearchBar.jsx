import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch, initialValue = '' }) => {
    const [term, setTerm] = useState(initialValue);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (term.trim()) {
            if (onSearch) {
                onSearch(term);
            } else {
                navigate(`/search?q=${encodeURIComponent(term)}`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto group">
            <div className="relative">
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Busca juegos por nombre (ej. The Witcher, Mario...)"
                    className="w-full bg-bg-secondary text-text-main pl-14 pr-4 py-4 rounded-2xl border-2 border-bg-tertiary focus:outline-none focus:border-accent-purple focus:ring-4 focus:ring-accent-purple/10 transition-all shadow-xl placeholder-text-muted text-lg"
                />
                <svg
                    className="h-6 w-6 absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-purple transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>

                {term && (
                    <button
                        type="button"
                        onClick={() => setTerm('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main p-1 hover:bg-bg-tertiary rounded-full transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                )}
            </div>
        </form>
    );
};

export default SearchBar;
