import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEventsMock } from '../../services/events';

export const fetchAllEvents = createAsyncThunk(
    'events/fetchAllEvents',
    async () => {
        const events = await fetchEventsMock();
        return events;
    }
);

const initialMyEvents = JSON.parse(localStorage.getItem('myEvents')) || [];

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        myEvents: initialMyEvents,
    },
    reducers: {
        toggleEventParticipation: (state, action) => {
            const event = action.payload;
            const index = state.myEvents.findIndex(e => e.id === event.id);

            if (index !== -1) {
                // Leave event
                state.myEvents.splice(index, 1);
            } else {
                // Join event
                state.myEvents.push(event);
            }

            // Update localStorage
            localStorage.setItem('myEvents', JSON.stringify(state.myEvents));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchAllEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { toggleEventParticipation } = eventsSlice.actions;
export default eventsSlice.reducer;
