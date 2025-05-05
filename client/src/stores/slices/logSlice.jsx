import { createSlice } from "@reduxjs/toolkit";
import { getAllLogs } from "../actions/logsActions";

const initialState = {
    logs: [],
    log: null,
    logloading: false,
    logerror: null,
};

const logSlice = createSlice({
    name: "logs",
    initialState,
    reducers: {
        resetLogs: (state) => {
            state.logs = [];
            state.logerror = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllLogs.pending, (state) => {
                state.logloading = true;
                state.logerror = null;
            })
            .addCase(getAllLogs.fulfilled, (state, action) => {
                state.logloading = false;
                state.logs = action.payload.data;
            })
            .addCase(getAllLogs.rejected, (state, action) => {
                state.logloading = false;
                state.logerror = action.payload;
            });
    },
});

export const { resetLogs } = logSlice.actions;
export default logSlice.reducer;
