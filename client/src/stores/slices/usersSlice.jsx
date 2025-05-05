import { createSlice } from "@reduxjs/toolkit";
import {
    fetchusers,
    fetchusersByIdAsync,
    createusers,
    updateusers,
    deleteusers,
    creditTransfer,
    creditAdjust,
    toggleUserStatus
} from "../actions/userAction";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        user: null,
        userLoading: false,
        userError: null,
        userMessage: null,
    },
    reducers: {
        resetuserState: (state) => {
            state.userError = null;
            state.userMessage = null;
            
        },
        resetData: () => {
           
            return { users: [] }; // Reset state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchusers.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(fetchusers.fulfilled, (state, action) => {
                state.users = action.payload.data;
                state.userLoading = false;
                state.userMessage = "users fetched successfully.";
                state.userError = null;
            })
            .addCase(fetchusers.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = action.payload;
            });
        builder
            .addCase(createusers.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(createusers.fulfilled, (state, action) => {
           //     state.users = action.payload.data;
                state.userLoading = false;
                state.userMessage = "user created successfully.";
            })
            .addCase(createusers.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = action.payload;
            });

        builder
            .addCase(fetchusersByIdAsync.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(fetchusersByIdAsync.fulfilled, (state, action) => {
                state.user = action.payload.data;
                state.userLoading = false;
            })
            .addCase(fetchusersByIdAsync.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = action.payload;
            });

        builder
            .addCase(updateusers.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(updateusers.fulfilled, (state, action) => {
                state.users = action.payload.data;
                state.userLoading = false;
                state.userMessage = "user updated successfully.";
            })
            .addCase(updateusers.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = action.payload;
            });

        builder
            .addCase(creditTransfer.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(creditTransfer.fulfilled, (state, action) => {
                const { users, receiverWallet } = action.payload.data;
                state.users = users;
                state.user = receiverWallet;
                state.userLoading = false;
                state.userMessage = "Credit transferred successfully.";
            })
            .addCase(creditTransfer.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = action.payload;
            });
        builder
            .addCase(deleteusers.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(deleteusers.fulfilled, (state, action) => {
                state.users = action.payload.data;
                state.userLoading = false;
                state.userMessage = "user deleted successfully.";
            })
            .addCase(deleteusers.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = action.payload;
            });

        builder
            .addCase(creditAdjust.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(creditAdjust.fulfilled, (state, action) => {
                const { users, receiver } = action.payload.data;
                state.users = users;
                state.user = receiver;
                state.userLoading = false;
                state.userMessage = "Credit adjustment successful.";
            })
            .addCase(creditAdjust.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = action.payload;
            });

        builder
            .addCase(toggleUserStatus.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(toggleUserStatus.fulfilled, (state, action) => {
                state.users = action.payload.data;
                state.userLoading = false;
                state.userMessage = "User status updated successfully.";
            })
            .addCase(toggleUserStatus.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = action.payload;
            });
    }
});

export const { resetuserState,resetData } = userSlice.actions;
export default userSlice.reducer;
