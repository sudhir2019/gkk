import { createSlice } from "@reduxjs/toolkit";
import {
    fetchretailers,
    fetchretailersByIdAsync,
    createretailers,
    updateretailers,
    deleteretailers,
    creditTransfer,
    creditAdjust,
    toggleUserStatus,

    getretailersChildren,
    createretailersChild,
    updateretailersChild,
    creditTransferToChild,
    creditAdjustToChild,
    toggleChildStatus,
    deleteChild,
    getChildById
} from "../actions/retailerAction";

const retailerSlice = createSlice({
    name: "retailer",
    initialState: {
        retailers: [],
        retailer: null,
        retailerLoading: false,
        retailerError: null,
        retailerMessage: null,
        children: [],
        childrenInfo: null,
        childrenLoading: false,
        childrenError: null,
        childrenMessage: null,
    },
    reducers: {
        resetretailerState: (state) => {
            state.retailerError = null;
            state.retailerMessage = null;
        },
        resetData: () => {

            return { retailers: [], children: [] }; // Reset state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchretailers.pending, (state) => {
                state.retailerLoading = true;
            })
            .addCase(fetchretailers.fulfilled, (state, action) => {
                state.retailers = action.payload.data;
                state.retailerLoading = false;
                state.retailerMessage = "retailers fetched successfully.";
                state.retailerError = null;
            })
            .addCase(fetchretailers.rejected, (state, action) => {
                state.retailerLoading = false;
                state.retailerError = action.payload;
            });
        builder
            .addCase(createretailers.pending, (state) => {
                state.retailerLoading = true;
            })
            .addCase(createretailers.fulfilled, (state, action) => {
                //  state.retailers = action.payload.data;
                state.retailerLoading = false;
                state.retailerMessage = "retailer created successfully.";
            })
            .addCase(createretailers.rejected, (state, action) => {
                state.retailerLoading = false;
                state.retailerError = action.payload;
            });

        builder
            .addCase(fetchretailersByIdAsync.pending, (state) => {
                state.retailerLoading = true;
            })
            .addCase(fetchretailersByIdAsync.fulfilled, (state, action) => {
                state.retailer = action.payload.data;
                state.retailerLoading = false;
            })
            .addCase(fetchretailersByIdAsync.rejected, (state, action) => {
                state.retailerLoading = false;
                state.retailerError = action.payload;
            });

        builder
            .addCase(updateretailers.pending, (state) => {
                state.retailerLoading = true;
            })
            .addCase(updateretailers.fulfilled, (state, action) => {
                state.retailers = action.payload.data;
                state.retailerLoading = false;
                state.retailerMessage = "retailer updated successfully.";
            })
            .addCase(updateretailers.rejected, (state, action) => {
                state.retailerLoading = false;
                state.retailerError = action.payload;
            });

        builder
            .addCase(creditTransfer.pending, (state) => {
                state.retailerLoading = true;
            })
            .addCase(creditTransfer.fulfilled, (state, action) => {
                const { retailers, receiverWallet } = action.payload.data;
                state.retailers = retailers;
                state.retailer = receiverWallet;
                state.retailerLoading = false;
                state.retailerMessage = "Credit transferred successfully.";
            })
            .addCase(creditTransfer.rejected, (state, action) => {
                state.retailerLoading = false;
                state.retailerError = action.payload;
            });
        builder
            .addCase(deleteretailers.pending, (state) => {
                state.retailerLoading = true;
            })
            .addCase(deleteretailers.fulfilled, (state, action) => {
                state.retailers = action.payload.data;
                state.retailerLoading = false;
                state.retailerMessage = "retailer deleted successfully.";
            })
            .addCase(deleteretailers.rejected, (state, action) => {
                state.retailerLoading = false;
                state.retailerError = action.payload;
            });

        builder
            .addCase(creditAdjust.pending, (state) => {
                state.retailerLoading = true;
            })
            .addCase(creditAdjust.fulfilled, (state, action) => {
                const { retailers, receiver } = action.payload.data;
                state.retailers = retailers;
                state.retailer = receiver;
                state.retailerLoading = false;
                state.retailerMessage = "Credit adjustment successful.";
            })
            .addCase(creditAdjust.rejected, (state, action) => {
                state.retailerLoading = false;
                state.retailerError = action.payload;
            });

        builder
            .addCase(toggleUserStatus.pending, (state) => {
                state.retailerLoading = true;
            })
            .addCase(toggleUserStatus.fulfilled, (state, action) => {
                state.retailers = action.payload.data;
                state.retailerLoading = false;
                state.retailerMessage = "User status updated successfully.";
            })
            .addCase(toggleUserStatus.rejected, (state, action) => {
                state.retailerLoading = false;
                state.retailerError = action.payload;
            });
        builder
            .addCase(getretailersChildren.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(getretailersChildren.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "retailerss Children fetched successfully.";
                state.retailer = action.payload.data.Master;
                state.children = action.payload.data.children;
            })
            .addCase(getretailersChildren.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(getChildById.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(getChildById.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "retailerss Children fetched successfully.";
                state.childrenInfo = action.payload.data;
            })
            .addCase(getChildById.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(createretailersChild.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(createretailersChild.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "retailerss Children Create successfully.";
                state.children = action.payload.data;
            })
            .addCase(createretailersChild.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(updateretailersChild.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(updateretailersChild.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "retailerss Children Update successfully.";
                state.children = action.payload.data;
            })
            .addCase(updateretailersChild.rejected, (state, action) => {
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
                state.childrenMessage = "retailerss Children Delete successfully.";
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
                const { RetailerChildren, receiverWallet } = action.payload.data;
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "retailerss Children Credit Transfer successfully.";
                state.children = RetailerChildren;
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
                const { RetailerChildren, receiver } = action.payload.data;
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "retailerss Children Credit Adjust successfully.";
                state.children = RetailerChildren;
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
                state.childrenMessage = "retailerss Children Status updated successfully.";
                state.children = action.payload.data;
            })
            .addCase(toggleChildStatus.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
    }
});

export const { resetretailerState, resetData } = retailerSlice.actions;
export default retailerSlice.reducer;
