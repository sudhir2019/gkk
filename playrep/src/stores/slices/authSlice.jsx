import { createSlice } from "@reduxjs/toolkit";
import {
    getUserByIdAsync,
    loginAsync,
    getSessionAsync,
    logoutAsync,
} from "../actions/authActions";

// Utils
import { clearToken, clearAuthData } from "../../utils/authUtils";

// Initial State
const initialState = {
    id: "",
    isLoading: false,
    isLoggedIn: false,
    isLoadingSession: false,
    authUser: [], // No user data in local storage
    token: "",
    roles: "",
    serverError: null,
    redirectUrl: "",
    isAdmin: false,
    isSuperAdmin: false,
    isSuperdistributers: false,
    isDistributers: false,
    isRetailers: false,
    isUser: false,
    session: null,
    isVerificationSuccessful: false,
    confirmationEmailSent: false,
    resetPasswordEmailSent: false,
    successMessage: null,

};


// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthState: () => {
            clearAuthData(); // Clear localStorage and cookies
            return initialState; // Reset state to initial values
        },
        resetData: () => {

            return { authUser: [] }; // Reset state
        },
    },
    extraReducers: (builder) => {
        builder
            // **Login**
            .addCase(loginAsync.pending, (state) => {
                state.isLoading = true;
                state.serverError = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                const { token, user, roles } = action.payload;
                state.isLoading = false;
                state.isLoggedIn = true;
                state.token = token;
                state.authUser = user;  // Ensure this line is correctly setting authUser
                state.roles = roles;
                localStorage.removeItem('persist:auth');
                // If you're using sessionStorage:
                sessionStorage.removeItem('persist:auth');
                const expiryTime = Date.now() + 30 * 60 * 1000; // 30 minutes expiry
                sessionStorage.setItem('authToken', token);
                sessionStorage.setItem('tokenExpiryTime', expiryTime);
                sessionStorage.setItem('role', roles);
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.serverError = action.payload || "Login failed.";
            })

            // **Session**
            .addCase(getSessionAsync.pending, (state) => {
                state.isLoadingSession = true;
            })
            .addCase(getSessionAsync.fulfilled, (state, action) => {
                const { token, user } = action.payload;
                state.isLoadingSession = false;
                state.isLoggedIn = true;
                state.token = token;
                state.authUser = user;
                state.roles = user.roles;
            })
            .addCase(getSessionAsync.rejected, (state) => {
                state.isLoadingSession = false;
                clearAuthData();
            })
            // **Logout**
            .addCase(logoutAsync.pending, (state) => {
                state.isLoading = true; // Show loading indicator
                state.serverError = null; // Clear previous errors

                clearToken();
                clearAuthData();
                state.serverError = null;
                state.isLoading = false;
                state.isLoggedIn = false;
                state.isLoadingSession = false;
                state.authUser = []; // No user data in local storage
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                // console.log("fulfilled", state)
                state.isLoading = false; // Hide loading indicator
                clearToken();
                clearAuthData();
                state.serverError = null;
                state.isLoading = false;
                state.isLoggedIn = false;
                state.isLoadingSession = false;
                state.authUser = []; // No user data in local storage
            })
            .addCase(logoutAsync.rejected, (state, action) => {
                state.isLoading = false; // Hide loading indicator
                state.serverError = action.payload || "Logout failed."; // Set error message
            })
            // **Get User by ID**
            .addCase(getUserByIdAsync.fulfilled, (state, action) => {
                state.authUser = action.payload.data;
            });
    },
});

// Export actions
export const { resetAuthState, resetData } = authSlice.actions;

// Export reducer
export default authSlice.reducer;