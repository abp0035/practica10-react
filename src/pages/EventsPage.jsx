import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents, toggleEventParticipation } from '../store/slices/eventsSlice';

const EventsPage = () => {
    const dispatch = useDispatch();
    const { items: events, status, error, myEvents } = useSelector(state => state.events);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllEvents());
        }
    }, [status, dispatch]);

    const isParticipating = (eventId) => {
        return myEvents.some(e => e.id === eventId);
    };

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-16 h-16 border-4 border-accent-cyan border-t-accent-purple rounded-full animate-spin"></div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-status-error/10 border border-status-error text-status-error p-6 rounded-2xl max-w-2xl mx-auto flex items-center gap-4">
                    <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Error al Cargar</h3>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-black mb-8">Próximos Eventos Gaming</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => {
                    const participating = isParticipating(event.id);
                    return (
                        <div key={event.id} className="bg-bg-secondary rounded-2xl overflow-hidden shadow-lg border border-bg-tertiary transition-transform duration-300 hover:-translate-y-2 flex flex-col h-full">
                            <div className="relative aspect-video">
                                <img
                                    src={event.image || 'https://via.placeholder.com/600x400?text=Event'}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
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

                            <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                                <p className="text-text-secondary leading-relaxed">
                                    No te pierdas de este gran evento. Disfruta junto con miles de apasionados por los videojuegos de las últimas novedades.
                                </p>

                                <button
                                    onClick={() => dispatch(toggleEventParticipation(event))}
                                    className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${participating
                                            ? 'bg-status-error/20 text-status-error hover:bg-status-error hover:text-white border border-status-error/50'
                                            : 'bg-accent-cyan text-bg-main hover:bg-accent-purple hover:text-white shadow-lg shadow-accent-cyan/20 hover:shadow-accent-purple/40'
                                        }`}
                                >
                                    {participating ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            Cancelar Participación
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            ¡Apuntarme!
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EventsPage;
