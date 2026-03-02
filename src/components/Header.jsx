import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-bg-secondary border-b border-bg-tertiary sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center justify-between w-full md:w-auto gap-8">
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

                    <nav className="flex items-center gap-4 md:gap-6">
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
                        <NavLink
                            to="/events"
                            className={({ isActive }) =>
                                `font-bold transition-colors ${isActive ? 'text-accent-purple' : 'text-text-secondary hover:text-text-main'}`
                            }
                        >
                            Eventos
                        </NavLink>
                        <NavLink
                            to="/publishers"
                            className={({ isActive }) =>
                                `font-bold transition-colors ${isActive ? 'text-accent-purple' : 'text-text-secondary hover:text-text-main'}`
                            }
                        >
                            Publishers
                        </NavLink>
                    </nav>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-2 focus:outline-none"
                    >
<<<<<<< HEAD
<div className="w-10 h-10 rounded-full border-2 border-accent-cyan hover:border-accent-purple transition-colors bg-bg-tertiary flex items-center justify-center text-text-main font-black text-xl">
    A
</div>
                    </button >

    { isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-bg-secondary rounded-xl shadow-lg border border-bg-tertiary py-2 z-50">
            <Link
                to="/favorites"
                className="block px-4 py-2 font-medium text-text-secondary hover:text-accent-cyan hover:bg-bg-tertiary transition-colors"
                onClick={() => setIsMenuOpen(false)}
            >
                Mis Favoritos
            </Link>
            <Link
                to="/my-events"
                className="block px-4 py-2 font-medium text-text-secondary hover:text-accent-purple hover:bg-bg-tertiary transition-colors"
                onClick={() => setIsMenuOpen(false)}
            >
                Mis Eventos
            </Link>
        </div>
    )}
                </div >
=======
                        Explorar
                    </NavLink>
                    <NavLink
                        to="/publishers"
                        className={({ isActive }) =>
                            `font-bold transition-colors ${isActive ? 'text-accent-purple' : 'text-text-secondary hover:text-text-main'}`
                        }
                    >
                        Publishers
                    </NavLink>
                </nav>
>>>>>>> 6dbe6d7810fc5109a1d051de86427518ca7789a2
            </div >
        </header >
    );
};

export default Header;
