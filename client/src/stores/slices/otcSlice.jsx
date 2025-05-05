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
} from "../actions/otcActions";

const otcSlice = createSlice({
    name: "otc",
    initialState: {
        otcs: [],
        otc: null,
        otcLoading: false,

        amountError: null,
        amountLoding: null,
        senderAmount: 0,
        receiverAmount: 0,

        otcError: null,
        otcMessage: null,
    },
    reducers: {
        resetotcState: (state) => {
            state.otcError = null;
            state.otcMessage = null;

        },
        resetData: () => {

            return { otcs: [] }; // Reset state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchusers.pending, (state) => {
                state.otcLoading = true;
            })
            .addCase(fetchusers.fulfilled, (state, action) => {
                state.otcs = action.payload.data;
                state.otcLoading = false;
                state.otcMessage = "otcs fetched successfully.";
                state.otcError = null;
            })
            .addCase(fetchusers.rejected, (state, action) => {
                state.otcLoading = false;
                state.otcError = action.payload;
            });
        builder
            .addCase(createusers.pending, (state) => {
                state.otcLoading = true;
            })
            .addCase(createusers.fulfilled, (state, action) => {
                //     state.otcs = action.payload.data;
                state.otcLoading = false;
                state.otcMessage = "otc created successfully.";
            })
            .addCase(createusers.rejected, (state, action) => {
                state.otcLoading = false;
                state.otcError = action.payload;
            });

        builder
            .addCase(fetchusersByIdAsync.pending, (state) => {
                state.otcLoading = true;
            })
            .addCase(fetchusersByIdAsync.fulfilled, (state, action) => {
                state.otc = action.payload.data;
                state.otcLoading = false;
            })
            .addCase(fetchusersByIdAsync.rejected, (state, action) => {
                state.otcLoading = false;
                state.otcError = action.payload;
            });

        builder
            .addCase(updateusers.pending, (state) => {
                state.otcLoading = true;
            })
            .addCase(updateusers.fulfilled, (state, action) => {
                state.otcs = action.payload.data;
                state.otcLoading = false;
                state.otcMessage = "otc updated successfully.";
            })
            .addCase(updateusers.rejected, (state, action) => {
                state.otcLoading = false;
                state.otcError = action.payload;
            });

        builder
            .addCase(creditTransfer.pending, (state) => {
                state.otcLoading = true;
            })
            .addCase(creditTransfer.fulfilled, (state, action) => {
                const { otcs, receiverWallet } = action.payload.data;
                state.otcs = otcs;
                state.otc = receiverWallet;
                state.otcLoading = false;
                state.otcMessage = "Credit transferred successfully.";
            })
            .addCase(creditTransfer.rejected, (state, action) => {
                state.otcLoading = false;
                state.otcError = action.payload;
            });
        builder
            .addCase(deleteusers.pending, (state) => {
                state.otcLoading = true;
            })
            .addCase(deleteusers.fulfilled, (state, action) => {
                state.otcs = action.payload.data;
                state.otcLoading = false;
                state.otcMessage = "otc deleted successfully.";
            })
            .addCase(deleteusers.rejected, (state, action) => {
                state.otcLoading = false;
                state.otcError = action.payload;
            });

        builder
            .addCase(creditAdjust.pending, (state) => {
                state.otcLoading = true;
            })
            .addCase(creditAdjust.fulfilled, (state, action) => {
                const { otcs, receiver } = action.payload.data;
                state.otcs = otcs;
                state.otc = receiver;
                state.otcLoading = false;
                state.otcMessage = "Credit adjustment successful.";
            })
            .addCase(creditAdjust.rejected, (state, action) => {
                state.otcLoading = false;
                state.otcError = action.payload;
            });

        builder
            .addCase(toggleUserStatus.pending, (state) => {
                state.otcLoading = true;
            })
            .addCase(toggleUserStatus.fulfilled, (state, action) => {
                state.otcs = action.payload.data;
                state.otcLoading = false;
                state.otcMessage = "otc status updated successfully.";
            })
            .addCase(toggleUserStatus.rejected, (state, action) => {
                state.otcLoading = false;
                state.otcError = action.payload;
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

export const { resetotcState, resetData } = otcSlice.actions;
export default otcSlice.reducer;
