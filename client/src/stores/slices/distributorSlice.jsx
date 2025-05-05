import { createSlice } from "@reduxjs/toolkit";
import {
    fetchdistributorss,
    fetchdistributorsByIdAsync,
    createdistributors,
    updatedistributors,
    deletedistributors,
    creditTransfer,
    creditAdjust,
    toggleUserStatus,
    getdistributorChildren,
    createdistributorChild,
    updatedistributorChild,
    creditTransferToChild,
    creditAdjustToChild,
    toggleChildStatus,
    deleteChild,
    getChildById
} from "../actions/distributorAction";

const distributorsSlice = createSlice({
    name: "distributors",
    initialState: {
        distributors: [],
        distributor: null,
        distributorsLoading: false,
        distributorsError: null,
        distributorsMessage: null,
        children: [],
        childrenInfo: null,
        childrenLoading: false,
        childrenError: null,
        childrenMessage: null,
    },
    reducers: {
        resetdistributorsState: (state) => {
            state.distributorsError = null;
            state.distributorsMessage = null;
        },
        resetData: () => {

            return { distributors: [], children: [] }; // Reset state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchdistributorss.pending, (state) => {
                state.distributorsLoading = true;
            })
            .addCase(fetchdistributorss.fulfilled, (state, action) => {
                state.distributors = action.payload.data;
                state.distributorsLoading = false;
                state.distributorsMessage = "distributorss fetched successfully.";
                state.distributorsError = null;
            })
            .addCase(fetchdistributorss.rejected, (state, action) => {
                state.distributorsLoading = false;
                state.distributorsError = action.payload;
            });
        builder
            .addCase(createdistributors.pending, (state) => {
                state.distributorsLoading = true;
            })
            .addCase(createdistributors.fulfilled, (state, action) => {
                //  state.distributors = action.payload.data;
                state.distributorsLoading = false;
                state.distributorsMessage = "distributors created successfully.";
            })
            .addCase(createdistributors.rejected, (state, action) => {
                state.distributorsLoading = false;
                state.distributorsError = action.payload;
            });

        builder
            .addCase(fetchdistributorsByIdAsync.pending, (state) => {
                state.distributorsLoading = true;
            })
            .addCase(fetchdistributorsByIdAsync.fulfilled, (state, action) => {
                state.distributor = action.payload.data;
                state.distributorsLoading = false;
            })
            .addCase(fetchdistributorsByIdAsync.rejected, (state, action) => {
                state.distributorsLoading = false;
                state.distributorsError = action.payload;
            });

        builder
            .addCase(updatedistributors.pending, (state) => {
                state.distributorsLoading = true;
            })
            .addCase(updatedistributors.fulfilled, (state, action) => {
                state.distributors = action.payload.data;
                state.distributorsLoading = false;
                state.distributorsMessage = "distributors updated successfully.";
            })
            .addCase(updatedistributors.rejected, (state, action) => {
                state.distributorsLoading = false;
                state.distributorsError = action.payload;
            });

        builder
            .addCase(creditTransfer.pending, (state) => {
                state.distributorsLoading = true;
            })
            .addCase(creditTransfer.fulfilled, (state, action) => {
                const { distributors, receiverWallet } = action.payload.data;
                state.distributors = distributors;
                state.distributor = receiverWallet;
                state.distributorsLoading = false;
                state.distributorsMessage = "Credit transferred successfully.";
            })
            .addCase(creditTransfer.rejected, (state, action) => {
                state.distributorsLoading = false;
                state.distributorsError = action.payload;
            });
        builder
            .addCase(deletedistributors.pending, (state) => {
                state.distributorsLoading = true;
            })
            .addCase(deletedistributors.fulfilled, (state, action) => {
                state.distributors = action.payload.data;
                state.distributorsLoading = false;
                state.distributorsMessage = "distributors deleted successfully.";
            })
            .addCase(deletedistributors.rejected, (state, action) => {
                state.distributorsLoading = false;
                state.distributorsError = action.payload;
            });

        builder
            .addCase(creditAdjust.pending, (state) => {
                state.distributorsLoading = true;
            })
            .addCase(creditAdjust.fulfilled, (state, action) => {
                const { distributors, receiver } = action.payload.data;
                state.distributors = distributors;
                state.distributor = receiver;
                state.distributorsLoading = false;
                state.distributorsMessage = "Credit adjustment successful.";
            })
            .addCase(creditAdjust.rejected, (state, action) => {
                state.distributorsLoading = false;
                state.distributorsError = action.payload;
            });

        builder
            .addCase(toggleUserStatus.pending, (state) => {
                state.distributorsLoading = true;
            })
            .addCase(toggleUserStatus.fulfilled, (state, action) => {
                state.distributors = action.payload.data;
                state.distributorsLoading = false;
                state.distributorsMessage = "User status updated successfully.";
            })
            .addCase(toggleUserStatus.rejected, (state, action) => {
                state.distributorsLoading = false;
                state.distributorsError = action.payload;
            });
        builder
            .addCase(getdistributorChildren.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(getdistributorChildren.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "distributors Children fetched successfully.";
                state.distributor = action.payload.data.masters;
                state.children = action.payload.data.children;
            })
            .addCase(getdistributorChildren.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(getChildById.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(getChildById.fulfilled, (state, action) => {
                state.childrenInfo = action.payload.data;
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "distributors Children fetched successfully.";
            })
            .addCase(getChildById.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(createdistributorChild.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(createdistributorChild.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "distributors Children Create successfully.";
                state.children = action.payload.data;
            })
            .addCase(createdistributorChild.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(updatedistributorChild.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(updatedistributorChild.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "distributors Children Update successfully.";
                state.children = action.payload.data;
            })
            .addCase(updatedistributorChild.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(deleteChild.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(deleteChild.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "distributors Children Delete successfully.";
                state.children = action.payload.data;
            })
            .addCase(deleteChild.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(creditTransferToChild.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(creditTransferToChild.fulfilled, (state, action) => {
                const { retailersChildren, receiverWallet } = action.payload.data;
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "distributors Children Credit Transfer successfully.";
                state.children = retailersChildren;
                state.childrenInfo = receiverWallet;
            })
            .addCase(creditTransferToChild.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(creditAdjustToChild.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(creditAdjustToChild.fulfilled, (state, action) => {
                const { retailersChildren, receiver } = action.payload.data;
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "distributors Children Credit Adjust successfully.";
                state.children = retailersChildren;
                state.childrenInfo = receiver;
            })
            .addCase(creditAdjustToChild.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(toggleChildStatus.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(toggleChildStatus.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "distributors Children Status updated successfully.";
                state.children = action.payload.data;
            })
            .addCase(toggleChildStatus.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
    }
});

export const { resetdistributorsState, resetData } = distributorsSlice.actions;
export default distributorsSlice.reducer;
