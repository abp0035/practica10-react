
export const events = [
    {
        id: 1,
        title: "Gaming Expo 2025",
        location: "New York",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Indie Game Developers Meetup",
        location: "San Francisco",
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Developers Medac Championship",
        location: "Córdoba",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    },
];

// Simula una petición API que devuelve los eventos después de un pequeño retraso.
export const fetchEventsMock = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(events);
        }, 500); // Simula un retraso de 500 milisegundos
    });
};
