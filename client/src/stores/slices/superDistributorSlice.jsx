import { createSlice } from "@reduxjs/toolkit";
import {
    fetchsuperdistributorss,
    fetchsuperdistributorsByIdAsync,
    createsuperdistributors,
    updatesuperdistributors,
    deletesuperdistributors,
    creditTransfer,
    creditAdjust,
    toggleUserStatus,


    getsuperdistributorsChildren,
    createsuperdistributorsChild,
    updatesuperdistributorsChild,
    creditTransferToChild,
    creditAdjustToChild,
    toggleChildStatus,
    deleteChild,
    getsuperDistributorsChildById
} from "../actions/superDistributorAction";

const superdistributorsSlice = createSlice({
    name: "superdistributors",
    initialState: {
        superdistributors: [],
        superdistributor: null,
        superdistributorsLoading: false,
        superdistributorsError: null,
        superdistributorsMessage: null,
        children: [],
        childrenInfo: null,
        childrenLoading: false,
        childrenError: null,
        childrenMessage: null,
    },
    reducers: {
        resetsuperdistributorsState: (state) => {
            state.superdistributorsError = null;
            state.superdistributorsMessage = null;
            state.superdistributors = [];
            state.children = [];
        },
        resetData: () => {

            return { superdistributors: [], children: [] }; // Reset state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchsuperdistributorss.pending, (state) => {
                state.superdistributorsLoading = true;
            })
            .addCase(fetchsuperdistributorss.fulfilled, (state, action) => {
                state.superdistributors = action.payload.data;
                state.superdistributorsLoading = false;
                state.superdistributorsMessage = "superdistributorss fetched successfully.";
                state.superdistributorsError = null;
            })
            .addCase(fetchsuperdistributorss.rejected, (state, action) => {
                state.superdistributorsLoading = false;
                state.superdistributorsError = action.payload;
            });
        builder
            .addCase(createsuperdistributors.pending, (state) => {
                state.superdistributorsLoading = true;
            })
            .addCase(createsuperdistributors.fulfilled, (state, action) => {
                // state.superdistributors = action.payload.data;
                state.superdistributorsLoading = false;
                state.superdistributorsMessage = "superdistributors created successfully.";
            })
            .addCase(createsuperdistributors.rejected, (state, action) => {
                state.superdistributorsLoading = false;
                state.superdistributorsError = action.payload;
            });

        builder
            .addCase(fetchsuperdistributorsByIdAsync.pending, (state) => {
                state.superdistributorsLoading = true;
            })
            .addCase(fetchsuperdistributorsByIdAsync.fulfilled, (state, action) => {
                state.superdistributor = action.payload.data;
                state.superdistributorsLoading = false;
            })
            .addCase(fetchsuperdistributorsByIdAsync.rejected, (state, action) => {
                state.superdistributorsLoading = false;
                state.superdistributorsError = action.payload;
            });

        builder
            .addCase(updatesuperdistributors.pending, (state) => {
                state.superdistributorsLoading = true;
            })
            .addCase(updatesuperdistributors.fulfilled, (state, action) => {
                state.superdistributors = action.payload.data;
                state.superdistributorsLoading = false;
                state.superdistributorsMessage = "superdistributors updated successfully.";
            })
            .addCase(updatesuperdistributors.rejected, (state, action) => {
                state.superdistributorsLoading = false;
                state.superdistributorsError = action.payload;
            });

        builder
            .addCase(creditTransfer.pending, (state) => {
                state.superdistributorsLoading = true;
            })
            .addCase(creditTransfer.fulfilled, (state, action) => {
                const { superdistributors, receiverWallet } = action.payload.data;
                state.superdistributors = superdistributors;
                state.superdistributor = receiverWallet;
                state.superdistributorsLoading = false;
                state.superdistributorsMessage = "Credit transferred successfully.";
            })
            .addCase(creditTransfer.rejected, (state, action) => {
                state.superdistributorsLoading = false;
                state.superdistributorsError = action.payload;
            });
        builder
            .addCase(deletesuperdistributors.pending, (state) => {
                state.superdistributorsLoading = true;
            })
            .addCase(deletesuperdistributors.fulfilled, (state, action) => {
                state.superdistributors = action.payload.data;
                state.superdistributorsLoading = false;
                state.superdistributorsMessage = "superdistributors deleted successfully.";
            })
            .addCase(deletesuperdistributors.rejected, (state, action) => {
                state.superdistributorsLoading = false;
                state.superdistributorsError = action.payload;
            });

        builder
            .addCase(creditAdjust.pending, (state) => {
                state.superdistributorsLoading = true;
            })
            .addCase(creditAdjust.fulfilled, (state, action) => {
                const { superdistributors, receiver } = action.payload.data;
                state.superdistributors = superdistributors;
                state.superdistributor = receiver;
                state.superdistributorsLoading = false;
                state.superdistributorsMessage = "Credit adjustment successful.";
            })
            .addCase(creditAdjust.rejected, (state, action) => {
                state.superdistributorsLoading = false;
                state.superdistributorsError = action.payload;
            });

        builder
            .addCase(toggleUserStatus.pending, (state) => {
                state.superdistributorsLoading = true;
            })
            .addCase(toggleUserStatus.fulfilled, (state, action) => {
                state.superdistributors = action.payload.data;
                state.superdistributorsLoading = false;
                state.superdistributorsMessage = "User status updated successfully.";
            })
            .addCase(toggleUserStatus.rejected, (state, action) => {
                state.superdistributorsLoading = false;
                state.superdistributorsError = action.payload;
            });
        builder
            .addCase(getsuperdistributorsChildren.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(getsuperdistributorsChildren.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "superdistributorss Children fetched successfully.";
                state.superdistributor = action.payload.data.Superareamanager;
                state.children = action.payload.data.children;
            })
            .addCase(getsuperdistributorsChildren.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(getsuperDistributorsChildById.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(getsuperDistributorsChildById.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "Admins Children fetched successfully.";
                state.childrenInfo = action.payload.data;
            })
            .addCase(getsuperDistributorsChildById.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(createsuperdistributorsChild.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(createsuperdistributorsChild.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "superdistributorss Children Create successfully.";
                state.children = action.payload.data;
            })
            .addCase(createsuperdistributorsChild.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(updatesuperdistributorsChild.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(updatesuperdistributorsChild.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "superdistributorss Children Update successfully.";
                state.children = action.payload.data;
            })
            .addCase(updatesuperdistributorsChild.rejected, (state, action) => {
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
                state.childrenMessage = "superdistributorss Children Delete successfully.";
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
                const { distributorChildren, receiverWallet } = action.payload.data;
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "superdistributorss Children Credit Transfer successfully.";
                state.children = distributorChildren;
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
                const { distributorChildren, receiver } = action.payload.data;
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "superdistributorss Children Credit Adjust successfully.";
                state.children = distributorChildren;
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
                state.children = action.payload.data;
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "superdistributors Children Status updated successfully.";
            })
            .addCase(toggleChildStatus.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
    }
});

export const { resetsuperdistributorsState, resetData } = superdistributorsSlice.actions;
export default superdistributorsSlice.reducer;
