import { createSlice } from "@reduxjs/toolkit";
import { loadTransferableData, loadReceivableData, loadBalance, pointTransfer, loadUsers } from "../actions/appActions";

// Initial state
const initialState = {
    isLoading: true,
    successMessage: "", // ✅ Fixed Typo: successMessgae -> successMessage
    errorMessage: "",
    transferData: [],
    receiveData: [],
    userData: [],
    treeData: []
};

// Create app slice
const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setSuccessMessage: (state, action) => {
            state.successMessage = action.payload; // ✅ Added Reducer
        },
        resetData: () => ({
            ...initialState,

        }),


    },
    extraReducers: (builder) => {
        builder
            .addCase(loadBalance.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadBalance.fulfilled, (state, action) => {
                state.userData = action.payload.data;
                state.isLoading = false;
            })
            .addCase(loadBalance.rejected, (state) => {
                state.isLoading = false;
            });


        builder
            .addCase(loadUsers.fulfilled, (state, action) => {
                state.treeData = action.payload.data;
                state.isLoading = false;
              
            });

        builder
            .addCase(loadTransferableData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadTransferableData.fulfilled, (state, action) => {
                state.transferData = action.payload.data;
                state.isLoading = false;
            })
            .addCase(loadTransferableData.rejected, (state) => {
                state.isLoading = false;
            });

        builder
            .addCase(loadReceivableData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadReceivableData.fulfilled, (state, action) => {
                state.receiveData = action.payload.data;
                state.isLoading = false;
            })
            .addCase(loadReceivableData.rejected, (state) => {
                state.isLoading = false;
            });

        builder
            .addCase(pointTransfer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(pointTransfer.fulfilled, (state, action) => {
                state.pointTransfer = action.payload.data;
                state.successMessage = "Point Transfer Successfully!"; // ✅ Fixed Typo
                state.isLoading = false; // ✅ Reset loading state
            })
            .addCase(pointTransfer.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

// Export actions
export const { setLoading, successMessage, setSuccessMessage, resetData } = appSlice.actions;
export default appSlice.reducer;
