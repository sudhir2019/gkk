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
} from "../actions/loanActions";

const loanSlice = createSlice({
    name: "loan",
    initialState: {
        loans: [],
        loan: null,
        loanLoading: false,

        amountError: null,
        amountLoding: null,
        senderAmount: 0,
        receiverAmount: 0,

        loanError: null,
        loanMessage: null,
    },
    reducers: {
        resetloanState: (state) => {
            state.loanError = null;
            state.loanMessage = null;

        },
        resetData: () => {

            return { loans: [] }; // Reset state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchusers.pending, (state) => {
                state.loanLoading = true;
            })
            .addCase(fetchusers.fulfilled, (state, action) => {
                state.loans = action.payload.data;
                state.loanLoading = false;
                state.loanMessage = "loans fetched successfully.";
                state.loanError = null;
            })
            .addCase(fetchusers.rejected, (state, action) => {
                state.loanLoading = false;
                state.loanError = action.payload;
            });
        builder
            .addCase(createusers.pending, (state) => {
                state.loanLoading = true;
            })
            .addCase(createusers.fulfilled, (state, action) => {
                //     state.loans = action.payload.data;
                state.loanLoading = false;
                state.loanMessage = "loan created successfully.";
            })
            .addCase(createusers.rejected, (state, action) => {
                state.loanLoading = false;
                state.loanError = action.payload;
            });

        builder
            .addCase(fetchusersByIdAsync.pending, (state) => {
                state.loanLoading = true;
            })
            .addCase(fetchusersByIdAsync.fulfilled, (state, action) => {
                state.loan = action.payload.data;
                state.loanLoading = false;
            })
            .addCase(fetchusersByIdAsync.rejected, (state, action) => {
                state.loanLoading = false;
                state.loanError = action.payload;
            });

        builder
            .addCase(updateusers.pending, (state) => {
                state.loanLoading = true;
            })
            .addCase(updateusers.fulfilled, (state, action) => {
                state.loans = action.payload.data;
                state.loanLoading = false;
                state.loanMessage = "loan updated successfully.";
            })
            .addCase(updateusers.rejected, (state, action) => {
                state.loanLoading = false;
                state.loanError = action.payload;
            });

        builder
            .addCase(creditTransfer.pending, (state) => {
                state.loanLoading = true;
            })
            .addCase(creditTransfer.fulfilled, (state, action) => {
                const { loans, receiverWallet } = action.payload.data;
                state.loans = loans;
                state.loan = receiverWallet;
                state.loanLoading = false;
                state.loanMessage = "Credit transferred successfully.";
            })
            .addCase(creditTransfer.rejected, (state, action) => {
                state.loanLoading = false;
                state.loanError = action.payload;
            });
        builder
            .addCase(deleteusers.pending, (state) => {
                state.loanLoading = true;
            })
            .addCase(deleteusers.fulfilled, (state, action) => {
                state.loans = action.payload.data;
                state.loanLoading = false;
                state.loanMessage = "loan deleted successfully.";
            })
            .addCase(deleteusers.rejected, (state, action) => {
                state.loanLoading = false;
                state.loanError = action.payload;
            });

        builder
            .addCase(creditAdjust.pending, (state) => {
                state.loanLoading = true;
            })
            .addCase(creditAdjust.fulfilled, (state, action) => {
                const { loans, receiver } = action.payload.data;
                state.loans = loans;
                state.loan = receiver;
                state.loanLoading = false;
                state.loanMessage = "Credit adjustment successful.";
            })
            .addCase(creditAdjust.rejected, (state, action) => {
                state.loanLoading = false;
                state.loanError = action.payload;
            });

        builder
            .addCase(toggleUserStatus.pending, (state) => {
                state.loanLoading = true;
            })
            .addCase(toggleUserStatus.fulfilled, (state, action) => {
                state.loans = action.payload.data;
                state.loanLoading = false;
                state.loanMessage = "loan status updated successfully.";
            })
            .addCase(toggleUserStatus.rejected, (state, action) => {
                state.loanLoading = false;
                state.loanError = action.payload;
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

export const { resetloanState, resetData } = loanSlice.actions;
export default loanSlice.reducer;
