import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../services/service';

// Thunks
export const fetchPopularGames = createAsyncThunk(
    'games/fetchPopularGames',
    async () => {
        const response = await service.getPopularGames();
        return response.data.results;
    }
);

export const searchGamesAsync = createAsyncThunk(
    'games/searchGames',
    async (query) => {
        const response = await service.searchGames(query);
        return response.data.results;
    }
);

export const fetchGameDetailsAsync = createAsyncThunk(
    'games/fetchGameDetails',
    async (id) => {
        const response = await service.getGameDetails(id);
        return response.data;
    }
);

// Favoritos iniciales desde localStorage
const initialFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        popularGames: [],
        searchResults: [],
        gameDetails: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        favorites: initialFavorites,
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const game = action.payload;
            const index = state.favorites.findIndex(fav => fav.id === game.id);

            if (index !== -1) {
                // Remove from favorites
                state.favorites.splice(index, 1);
            } else {
                // Add to favorites
                state.favorites.push(game);
            }

            // Update localStorage
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        clearSearchResults: (state) => {
            state.searchResults = [];
        },
        clearGameDetails: (state) => {
            state.gameDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Popular Games
            .addCase(fetchPopularGames.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPopularGames.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.popularGames = action.payload;
            })
            .addCase(fetchPopularGames.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Search Games
            .addCase(searchGamesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchGamesAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.searchResults = action.payload;
            })
            .addCase(searchGamesAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Game Details
            .addCase(fetchGameDetailsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGameDetailsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.gameDetails = action.payload;
            })
            .addCase(fetchGameDetailsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { toggleFavorite, clearSearchResults, clearGameDetails } = gamesSlice.actions;
export default gamesSlice.reducer;
