import { createSlice } from '@reduxjs/toolkit';
import { loadGameData } from '../actions/liveActions';


// Initial state interface
const initialState = {
    isLoading: true,
    gameData: [],
    serverError: null
};

// Create app slice
const liveSlice = createSlice({
    name: 'live',
    initialState,
    reducers: {
        resetState: (state) => {
            // Reset the state to the initial values
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle the fulfilled state (successful API call)
            .addCase(loadGameData.fulfilled, (state, action) => {
                state.isLoading = false; // Set loading to false once data is loaded
                state.gameData = action.payload.data; // Set the credit data from the payload
                state.serverError = null; // Clear any previous errors
               
            })
            // Handle the pending state (API call in progress)
            .addCase(loadGameData.pending, (state) => {
                state.isLoading = true; // Set loading to true while the API call is in progress
                state.serverError = null; // Clear previous errors
            })
            // Handle the rejected state (API call failed)
            .addCase(loadGameData.rejected, (state, action) => {
                state.isLoading = false; // Stop loading
                state.serverError = action.error.message; // Set the error message if the request fails
            });
    }
});

// Export actions and reducer
export const { setLoading, resetState } = liveSlice.actions;
export default liveSlice.reducer;
