const Footer = () => {
    return (
        <footer className="bg-bg-secondary border-t border-bg-tertiary py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-text-main mb-2">GameScope</h3>
                        <p className="text-text-secondary max-w-sm">
                            Tu plataforma definitiva para descubrir y explorar el vasto mundo de los videojuegos.
                            Powered by RAWG API.
                        </p>
                    </div>
                    <div className="md:text-right text-text-muted text-sm italic">
                        &copy; {new Date().getFullYear()} GameScope. Diseñado con estilo y pasión.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
