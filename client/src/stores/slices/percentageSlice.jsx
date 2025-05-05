import { createSlice } from "@reduxjs/toolkit";

import { fetchGamepercentageByAdmin, updateWinpercentageBulk } from '../actions/percentageActions'

const percentageSlice = createSlice({
    name: "percentage",
    initialState: {
        adminGameList: [],
        gamesList: [],
        historyUsers: [],
        percentage: [],
        percentageError: null,
        percentageLoading: false,
        percentageMessage: null,
    },
    reducers: {
        setPercentage: (state, action) => {
            state.percentage = action.payload;
        },
        resetData: () => {

            return { adminGameList: [], gamesList: [], historyUsers: [], percentage: [] }; // Reset state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGamepercentageByAdmin.pending, (state) => {
                state.percentageLoading = true;
            })
            .addCase(fetchGamepercentageByAdmin.fulfilled, (state, action) => {
                state.percentageLoading = false;
                state.gamesList = action.payload.games;
                state.historyUsers = action.payload.users;
                state.adminGameList = action.payload.adminGameList;
            })
            .addCase(fetchGamepercentageByAdmin.rejected, (state, action) => {
                state.percentageLoading = false;
                state.percentageError = action.payload;
            });

        builder
            .addCase(updateWinpercentageBulk.pending, (state) => {
                state.percentageLoading = true;
            })
            .addCase(updateWinpercentageBulk.fulfilled, (state, action) => {
                console.log(action.payload.message);
                state.percentageLoading = false;
                state.gamesList = action.payload.games;
                state.historyUsers = action.payload.users;
                state.adminGameList = action.payload.adminGameList;
                state.percentageMessage = action.payload;
            })
            .addCase(updateWinpercentageBulk.rejected, (state, action) => {
                state.percentageLoading = false;
                state.percentageError = action.payload;
            });

    },
});

export const { setPercentage, resetData } = percentageSlice.actions;
export default percentageSlice.reducer;