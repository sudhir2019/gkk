import { createSlice } from "@reduxjs/toolkit";

import { fetchGames, createGame, updateGame, deleteGame, activateGameAsync, fetchGamesByUser } from '../actions/gameActions'
// Game slice
const gameSlice = createSlice({
    name: "games",
    initialState: {
        games: [],
        currentGame: null,
        gamesLoading: false,
        gamesError: null,
        gamesMessage: null,
        lastUpdated: null,
        gameDeleted: false,
        lastFetchAttempt: null,
        gamesList: [],
        historyUsers: [],
        adminGameList: []
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

        resetData: () => {

            return { games: [], gamesList: [], historyUsers: [], adminGameList: [] }; // Reset state
        },
    },
    extraReducers: (builder) => {

        builder
            // Fetch all games
            .addCase(fetchGamesByUser.fulfilled, (state, action) => {
                state.gamesList = action.payload.games;
                state.historyUsers = action.payload.users;
                state.adminGameList = action.payload.adminGameList;

            });

        builder
            // Fetch all games
            .addCase(fetchGames.pending, (state) => {
                state.gamesLoading = true;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.gamesLoading = false;
                state.games = action.payload.data;
                state.gamesMessage = "Games fetched successfully";
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.gamesLoading = false;
                state.gamesError = action.payload || "Failed to fetch games. Please try again later.";
            })
            // Create a new game
            .addCase(createGame.pending, (state) => {
                state.gamesLoading = true;
            })
            .addCase(createGame.fulfilled, (state, action) => {
                state.gamesLoading = false;
                state.games = action.payload.data
                state.gamesMessage = "Game created successfully";
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(createGame.rejected, (state, action) => {
                state.gamesLoading = false;
                state.gamesError = action.payload || "Failed to create game";
            })
            // Update a game by ID
            .addCase(updateGame.pending, (state) => {
                state.gamesLoading = true;
            })
            .addCase(updateGame.fulfilled, (state, action) => {
                state.gamesLoading = false;
                state.games = action.payload.game || [];
                state.currentGame = action.payload;
                state.gamesMessage = `Game "${action.payload.updatedGame.gameName}" updated successfully`;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(updateGame.rejected, (state, action) => {
                state.gamesLoading = false;
                state.gamesError = action.payload || "Failed to update game";
            })

            // Delete a game by ID
            .addCase(deleteGame.pending, (state) => {
                state.gamesLoading = true;
            })
            .addCase(deleteGame.fulfilled, (state, action) => {
                state.gamesLoading = false;
                state.games = state.games.filter((game) => game._id !== action.meta.arg);
                state.gamesMessage = "Game deleted successfully";
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(deleteGame.rejected, (state, action) => {
                state.gamesLoading = false;
                state.gamesError = " Failed to Game deletion "
            })
            .addCase(activateGameAsync.pending, (state) => {
                state.gamesLoading = true;
            })
            .addCase(activateGameAsync.fulfilled, (state, action) => {
                state.gamesLoading = false;
                state.games = action.payload.data;
                state.gamesMessage = action.payload.message;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(activateGameAsync.rejected, (state, action) => {
                state.gamesLoading = false;
                state.gamesError = action.payload || "Failed to update game status";
            });
    },
});

// Export actions individually for better clarity
export const gameActions = gameSlice.actions;

// Export individual actions
export const {
    clearGamesError,
    clearGamesMessage,
    setCurrentGame,
    setGameDeleted,
    resetData
} = gameSlice.actions;

export default gameSlice.reducer;