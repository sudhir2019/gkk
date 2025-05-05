import { createSlice } from '@reduxjs/toolkit';
import { loadcredit } from '../actions/creditActions'; // Assuming loadcredit is a thunk action

// Initial state interface
const initialState = {
    isLoading: true,
    credit: [],
    serverError: null
};

// Create app slice
const creditSlice = createSlice({
    name: 'credit',
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
            .addCase(loadcredit.fulfilled, (state, action) => {
                state.isLoading = false; // Set loading to false once data is loaded
                state.credit = action.payload.data; // Set the credit data from the payload
                state.serverError = null; // Clear any previous errors
                // console.log(action.payload);
            })
            // Handle the pending state (API call in progress)
            .addCase(loadcredit.pending, (state) => {
                state.isLoading = true; // Set loading to true while the API call is in progress
                state.serverError = null; // Clear previous errors
            })
            // Handle the rejected state (API call failed)
            .addCase(loadcredit.rejected, (state, action) => {
                state.isLoading = false; // Stop loading
                state.serverError = action.error.message; // Set the error message if the request fails
            });
    }
});

// Export actions and reducer
export const { setLoading, setCreditData, resetState } = creditSlice.actions;
export default creditSlice.reducer;
