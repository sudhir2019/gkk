import { createSlice } from "@reduxjs/toolkit";
import {
    fetchusers,
    fetchusersByIdAsync,
    createusers,
    updateusers,
    deleteusers,
    creditTransfer,
    creditAdjust,
    toggleUserStatus,
    loadcredit
} from "../actions/giftActions";

const giftSlice = createSlice({
    name: "gift",
    initialState: {
        gifts: [],
        gift: null,
        giftLoading: false,

        amountError: null,
        amountLoding: null,
        senderAmount: 0,
        receiverAmount: 0,

        giftError: null,
        giftMessage: null,
    },
    reducers: {
        resetgiftState: (state) => {
            state.giftError = null;
            state.giftMessage = null;

        },
        resetData: () => {

            return { gifts: [] }; // Reset state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchusers.pending, (state) => {
                state.giftLoading = true;
            })
            .addCase(fetchusers.fulfilled, (state, action) => {
                state.gifts = action.payload.data;
                state.giftLoading = false;
                state.giftMessage = "gifts fetched successfully.";
                state.giftError = null;
            })
            .addCase(fetchusers.rejected, (state, action) => {
                state.giftLoading = false;
                state.giftError = action.payload;
            });
        builder
            .addCase(createusers.pending, (state) => {
                state.giftLoading = true;
            })
            .addCase(createusers.fulfilled, (state, action) => {
                //     state.gifts = action.payload.data;
                state.giftLoading = false;
                state.giftMessage = "gift created successfully.";
            })
            .addCase(createusers.rejected, (state, action) => {
                state.giftLoading = false;
                state.giftError = action.payload;
            });

        builder
            .addCase(fetchusersByIdAsync.pending, (state) => {
                state.giftLoading = true;
            })
            .addCase(fetchusersByIdAsync.fulfilled, (state, action) => {
                state.gift = action.payload.data;
                state.giftLoading = false;
            })
            .addCase(fetchusersByIdAsync.rejected, (state, action) => {
                state.giftLoading = false;
                state.giftError = action.payload;
            });

        builder
            .addCase(updateusers.pending, (state) => {
                state.giftLoading = true;
            })
            .addCase(updateusers.fulfilled, (state, action) => {
                state.gifts = action.payload.data;
                state.giftLoading = false;
                state.giftMessage = "gift updated successfully.";
            })
            .addCase(updateusers.rejected, (state, action) => {
                state.giftLoading = false;
                state.giftError = action.payload;
            });

        builder
            .addCase(creditTransfer.pending, (state) => {
                state.giftLoading = true;
            })
            .addCase(creditTransfer.fulfilled, (state, action) => {
                const { gifts, receiverWallet } = action.payload.data;
                state.gifts = gifts;
                state.gift = receiverWallet;
                state.giftLoading = false;
                state.giftMessage = "Credit transferred successfully.";
            })
            .addCase(creditTransfer.rejected, (state, action) => {
                state.giftLoading = false;
                state.giftError = action.payload;
            });
        builder
            .addCase(deleteusers.pending, (state) => {
                state.giftLoading = true;
            })
            .addCase(deleteusers.fulfilled, (state, action) => {
                state.gifts = action.payload.data;
                state.giftLoading = false;
                state.giftMessage = "gift deleted successfully.";
            })
            .addCase(deleteusers.rejected, (state, action) => {
                state.giftLoading = false;
                state.giftError = action.payload;
            });

        builder
            .addCase(creditAdjust.pending, (state) => {
                state.giftLoading = true;
            })
            .addCase(creditAdjust.fulfilled, (state, action) => {
                const { gifts, receiver } = action.payload.data;
                state.gifts = gifts;
                state.gift = receiver;
                state.giftLoading = false;
                state.giftMessage = "Credit adjustment successful.";
            })
            .addCase(creditAdjust.rejected, (state, action) => {
                state.giftLoading = false;
                state.giftError = action.payload;
            });

        builder
            .addCase(toggleUserStatus.pending, (state) => {
                state.giftLoading = true;
            })
            .addCase(toggleUserStatus.fulfilled, (state, action) => {
                state.gifts = action.payload.data;
                state.giftLoading = false;
                state.giftMessage = "gift status updated successfully.";
            })
            .addCase(toggleUserStatus.rejected, (state, action) => {
                state.giftLoading = false;
                state.giftError = action.payload;
            });
        builder
            .addCase(loadcredit.pending, (state) => {
                state.amountLoding = true;
                state.serverError = null;
            })
            .addCase(loadcredit.fulfilled, (state, action) => {
                state.amountLoding = false;
                state.senderAmount = action.payload.data[0];
                state.amountError = null;
            })
            .addCase(loadcredit.rejected, (state, action) => {
                state.amountLoding = false;
                state.amountError = action.error.message;
            });
    }
});

export const { resetgiftState, resetData } = giftSlice.actions;
export default giftSlice.reducer;
