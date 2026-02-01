import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-bg-secondary border-b border-bg-tertiary sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <Link
                    to="/"
                    className="text-2xl font-black tracking-tighter text-text-main flex items-center gap-2 group"
                >
                    <span className="bg-accent-cyan p-1.5 rounded-xl group-hover:bg-accent-purple transition-all duration-500 shadow-lg shadow-accent-cyan/20 group-hover:shadow-accent-purple/40 group-hover:rotate-12">
                        <svg className="w-6 h-6 text-bg-main" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H10a1 1 0 01-1-1v-4z"></path>
                        </svg>
                    </span>
                    GAME<span className="text-accent-cyan group-hover:text-accent-purple transition-colors duration-500">SCOPE</span>
                </Link>

                <nav className="flex items-center gap-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `font-bold transition-colors ${isActive ? 'text-accent-purple' : 'text-text-secondary hover:text-text-main'}`
                        }
                    >
                        Inicio
                    </NavLink>
                    <NavLink
                        to="/search"
                        className={({ isActive }) =>
                            `font-bold transition-colors ${isActive ? 'text-accent-purple' : 'text-text-secondary hover:text-text-main'}`
                        }
                    >
                        Explorar
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
