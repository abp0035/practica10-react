import { useSearchParams } from 'react-router';

const Pagination = ({ totalPages }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    if (totalPages <= 1) return null;

    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        if (page === 1) {
            params.delete('page');
        } else {
            params.set('page', page);
        }
        setSearchParams(params);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Build page numbers: show max 5 pages around current
    const getPages = () => {
        const pages = [];
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + 4);
        start = Math.max(1, end - 4);

        if (start > 1) {
            pages.push(1);
            if (start > 2) pages.push('...');
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 py-10">
            {/* Previous */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl font-bold text-sm border border-bg-tertiary bg-bg-secondary text-text-secondary hover:border-accent-cyan hover:text-accent-cyan transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-bg-tertiary disabled:hover:text-text-secondary"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>

            {/* Page numbers */}
            {getPages().map((page, idx) =>
                page === '...' ? (
                    <span key={`dots-${idx}`} className="px-2 text-text-muted font-bold">…</span>
                ) : (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${page === currentPage
                                ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/30 scale-110'
                                : 'border border-bg-tertiary bg-bg-secondary text-text-secondary hover:border-accent-purple hover:text-accent-purple'
                            }`}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl font-bold text-sm border border-bg-tertiary bg-bg-secondary text-text-secondary hover:border-accent-cyan hover:text-accent-cyan transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-bg-tertiary disabled:hover:text-text-secondary"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
    );
};

export default Pagination;
