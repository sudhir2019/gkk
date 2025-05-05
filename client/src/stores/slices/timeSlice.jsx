import { createSlice } from "@reduxjs/toolkit";
import { fetchTimes } from '../actions/gameActions';

// Game slice
const timeSlice = createSlice({
    name: "times",
    initialState: {
        times: [], // Holds the list of times
        gamesError: null, // Holds any errors related to fetching games
        gamesMessage: null, // Holds any success messages
        currentGame: null, // Holds the current game details
        gameDeleted: false, // Boolean for game deletion state
        loading: false, // Track loading state
    },
    reducers: {
        clearGamesError: (state) => {
            state.gamesError = null;
        },
        clearGamesMessage: (state) => {
            state.gamesMessage = null;
        },
        setCurrentGame: (state, action) => {
            state.currentGame = action.payload;
        },
        setGameDeleted: (state) => {
            state.gameDeleted = true;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        resetData: () => {
           
            return { times: [] }; // Reset state
        },

    },
    extraReducers: (builder) => {
        builder
            // Fetch all games
            .addCase(fetchTimes.fulfilled, (state, action) => {
                state.times = action.payload.data;
                state.loading = false;
            })
            .addCase(fetchTimes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTimes.rejected, (state, action) => {
                state.loading = false;
                state.gamesError = action.error.message;
            });
    },
});

// Export actions individually for better clarity
export const gameActions = timeSlice.actions;

// Export individual actions
export const {
    clearGamesError,
    clearGamesMessage,
    setCurrentGame,
    setGameDeleted,
    setLoading,
    resetData
} = timeSlice.actions;

export default timeSlice.reducer;
