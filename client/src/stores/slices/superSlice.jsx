import { createSlice } from "@reduxjs/toolkit";
import { clearToken, clearAuthData } from "../../utils/authUtils";
import { fetchSuperAdmins, fetchUserById, fetchUserCount } from "../actions/superActions";


const superSlice = createSlice({
    name: "supers",
    initialState: {
        superadmins: [],
        usercount: [],
        userInfo: [],
        user: [],
        userss: [],
        isLoading: false,
    },
    reducers: {
        resetAuthState: () => {
            clearAuthData(); // Clear localStorage and cookies
            return { superadmins: [] }; // Reset state
        },
    },
    extraReducers: (builder) => {
        builder
            // **Super Admins**
            .addCase(fetchSuperAdmins.pending, (state) => {
                state.isLoading = true;
                state.superadmins = [];
            })
            .addCase(fetchSuperAdmins.fulfilled, (state, action) => {
                state.isLoading = false; // Ensure loading state is reset
                state.superadmins = action.payload.data; // Ensure payload structure
            })
            .addCase(fetchSuperAdmins.rejected, (state) => {
                state.isLoading = false;
                state.superadmins = [];
            })
            // **User**
            .addCase(fetchUserById.pending, (state) => {
                state.isLoading = true;
                state.userInfo = [];
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.user = action.payload.data
                state.userss = action.payload.users,
                    state.isLoading = false;
                state.userInfo = action.payload.data;
            })
            .addCase(fetchUserById.rejected, (state) => {
                state.isLoading = false;
                state.userInfo = [];
            })
            // **User Count**
            .addCase(fetchUserCount.pending, (state) => {
                state.isLoading = true;
                state.usercount = [];
            })
            .addCase(fetchUserCount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.usercount = action.payload;
            })
            .addCase(fetchUserCount.rejected, (state) => {
                state.isLoading = false;
                state.usercount = [];
            });
    }
});

export const { resetAuthState } = superSlice.actions;
export default superSlice.reducer;