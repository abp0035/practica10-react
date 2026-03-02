import { useDispatch, useSelector } from 'react-redux';
import { toggleEventParticipation } from '../store/slices/eventsSlice';
import { Link } from 'react-router-dom';

const MyEventsPage = () => {
    const dispatch = useDispatch();
    const myEvents = useSelector(state => state.events.myEvents);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-black mb-2">Mis Eventos</h1>
                    <p className="text-text-secondary text-lg">Eventos a los que estás asistiendo</p>
                </div>
                <Link
                    to="/events"
                    className="bg-bg-tertiary text-text-main font-bold py-2 px-6 rounded-xl hover:bg-accent-cyan hover:text-bg-main transition-colors border border-white/10"
                >
                    Explorar Más Eventos
                </Link>
            </div>

            {myEvents.length === 0 ? (
                <div className="text-center py-20 bg-bg-secondary rounded-2xl border border-bg-tertiary">
                    <p className="text-xl text-text-secondary mb-6">Aún no te has apuntado a ningún evento.</p>
                    <Link
                        to="/events"
                        className="bg-accent-cyan text-bg-main font-bold py-3 px-8 rounded-xl hover:bg-accent-purple hover:text-white transition-all duration-300 shadow-lg"
                    >
                        Ver Eventos Disponibles
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myEvents.map((event) => (
                        <div key={event.id} className="bg-bg-secondary rounded-2xl overflow-hidden shadow-lg border border-accent-purple/30 transition-transform duration-300 hover:-translate-y-2 flex flex-col h-full relative group">
                            <div className="absolute top-4 right-4 z-10 bg-accent-purple text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Asistiré
                            </div>

                            <div className="relative aspect-video">
                                <img
                                    src={event.image || 'https://via.placeholder.com/600x400?text=Event'}
                                    alt={event.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-main to-transparent opacity-60"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-2xl font-bold text-white mb-1 shadow-black drop-shadow-md">{event.title}</h3>
                                    <p className="text-gray-300 shadow-black drop-shadow-md flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        {event.location}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6">
                                <button
                                    onClick={() => dispatch(toggleEventParticipation(event))}
                                    className="w-full py-3 px-6 rounded-xl font-bold text-lg bg-status-error/10 text-status-error hover:bg-status-error hover:text-white border border-status-error/30 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    Cancelar Participación
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEventsPage;
