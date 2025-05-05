import { createSlice } from "@reduxjs/toolkit";

import { fetchronlinePlayer } from "../actions/onlinePlayerAction";

const onlinePlayerSlice = createSlice({
    name: "onlineplayer",
    initialState: {
        onlineplayers: [],
        onlineplayer: null,
        onlineplayerLoading: false,
        onlineplayerError: null,
        onlineplayerMessage: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchronlinePlayer.pending, (state) => {
                state.onlineplayerLoading = true;
                state.onlineplayerError = null;
                state.onlineplayerMessage = null;
            })
            .addCase(fetchronlinePlayer.fulfilled, (state, action) => {
                state.onlineplayers = action.payload;
                state.onlineplayerLoading = false;
                state.onlineplayerMessage = "Online players fetched successfully.";
                state.onlineplayerError = null;
            })
            .addCase(fetchronlinePlayer.rejected, (state, action) => {
                state.onlineplayerLoading = false;
                state.onlineplayerError = action.payload;
            });
    }
});

export default onlinePlayerSlice.reducer;