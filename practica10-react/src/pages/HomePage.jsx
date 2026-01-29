import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';

const HomePage = () => {
    return (
        <div className="space-y-20 animate-in fade-in duration-700">
            {/* Carousel Section */}
            <section>
                <Carousel />
            </section>

            {/* Features / Promo Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-10">
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-cyan/10 border border-accent-cyan/20 rounded-full">
                        <span className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse"></span>
                        <span className="text-accent-cyan text-xs font-black uppercase tracking-widest">Nuevas Características</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-text-main leading-tight tracking-tight">
                        Descubre tu próxima <span className="text-accent-cyan">Aventura</span> digital.
                    </h2>

                    <p className="text-lg text-text-secondary leading-relaxed max-w-xl text-balance">
                        Explora una base de datos de más de 500,000 juegos. Desde los clásicos retro
                        hasta los últimos lanzamientos de nueva generación. Nuestra búsqueda inteligente
                        te permite encontrar exactamente lo que buscas en segundos.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            to="/search"
                            className="bg-accent-cyan text-bg-main font-black px-10 py-4 rounded-2xl hover:bg-white transition-all duration-300 shadow-lg shadow-accent-cyan/20 flex items-center gap-3 group"
                        >
                            EXPLORAR TODO
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                        <button className="bg-bg-secondary text-text-main font-black px-8 py-4 rounded-2xl border border-bg-tertiary hover:border-text-muted transition-all duration-300">
                            VER CATEGORÍAS
                        </button>
                    </div>
                </div>

                <div className="relative group">
                    {/* Decorative Background for Image */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-accent-cyan to-accent-purple opacity-20 blur-3xl group-hover:opacity-30 transition-opacity"></div>

                    <div className="relative bg-bg-secondary border border-bg-tertiary p-3 rounded-[2.5rem] shadow-3xl overflow-hidden">
                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-status-error"></div>
                            <div className="w-3 h-3 rounded-full bg-status-warning"></div>
                            <div className="w-3 h-3 rounded-full bg-status-success"></div>
                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
                            alt="Gaming Experience"
                            className="w-full h-auto rounded-[2rem] object-cover filter saturate-[0.8] group-hover:saturate-[1.2] transition-all duration-500"
                        />

                        <div className="absolute bottom-8 right-8 bg-bg-main/90 backdrop-blur-xl border border-bg-tertiary p-6 rounded-3xl shadow-2xl max-w-xs transform group-hover:-translate-y-2 transition-transform">
                            <div className="text-accent-cyan font-black text-2xl mb-1">+500K</div>
                            <div className="text-text-secondary text-sm font-bold uppercase tracking-widest">Juegos Indexados</div>
                            <div className="mt-4 flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-bg-main bg-bg-tertiary`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Search Highlight */}
            <section className="bg-bg-secondary border border-bg-tertiary rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-pink/10 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-cyan/10 blur-[80px] rounded-full"></div>

                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                    <h3 className="text-3xl md:text-5xl font-black text-text-main">¿Buscas algo específico?</h3>
                    <p className="text-text-secondary font-medium">Usa nuestro buscador avanzado para filtrar por plataforma, género o puntuación de Metacritic.</p>
                    <Link
                        to="/search"
                        className="inline-block px-10 py-5 bg-text-main text-bg-main font-black rounded-2xl hover:bg-accent-pink hover:text-text-main transition-all duration-300"
                    >
                        IR AL BUSCADOR
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
