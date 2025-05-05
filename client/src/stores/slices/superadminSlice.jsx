import { createSlice } from "@reduxjs/toolkit";
import {
    fetchSuperadmins,
    fetchSuperadminByIdAsync,
    createSuperAdmin,
    updateSuperadmin,
    deleteSuperadmin,
    creditTransfer,
    creditAdjust,
    toggleUserStatus,

    getSuperAdminChildren,
    createSuperAdminChild,
    updateSuperAdminChild,
    creditTransferToChild,
    creditAdjustToChild,
    toggleChildStatus,
    deleteChild,
    getChildById
} from "../actions/superadminAction";

const superadminSlice = createSlice({
    name: "superadmins",
    initialState: {
        superadmins: [],
        superadmin: null,
        superadminLoading: false,
        superadminError: null,
        superadminMessage: null,
        children: [],
        childrenInfo: null,
        childrenLoading: false,
        childrenError: null,
        childrenMessage: null,
    },
    reducers: {
        resetsuperadminState: (state) => {
            state.superadminError = null;
            state.superadminMessage = null;
        },
        resetData: () => {
           
            return {  superadmins: [],children: [] }; // Reset state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuperadmins.pending, (state) => {
                state.superadminLoading = true;
            })
            .addCase(fetchSuperadmins.fulfilled, (state, action) => {
                state.superadmins = action.payload.data;
                state.superadminLoading = false;
                state.superadminMessage = "superadmins fetched successfully.";
                state.superadminError = null;
            })
            .addCase(fetchSuperadmins.rejected, (state, action) => {
                state.superadminLoading = false;
                state.superadminError = action.payload;
            });
        builder
            .addCase(createSuperAdmin.pending, (state) => {
                state.superadminLoading = true;
            })
            .addCase(createSuperAdmin.fulfilled, (state, action) => {
                state.superadmins = action.payload.data;
                state.superadminLoading = false;
                state.superadminMessage = "superadmin created successfully.";
            })
            .addCase(createSuperAdmin.rejected, (state, action) => {
                state.superadminLoading = false;
                state.superadminError = action.payload;
            });

        builder
            .addCase(fetchSuperadminByIdAsync.pending, (state) => {
                state.superadminLoading = true;
            })
            .addCase(fetchSuperadminByIdAsync.fulfilled, (state, action) => {
                state.superadmin = action.payload.data;
                state.superadminLoading = false;
            })
            .addCase(fetchSuperadminByIdAsync.rejected, (state, action) => {
                state.superadminLoading = false;
                state.superadminError = action.payload;
            });

        builder
            .addCase(updateSuperadmin.pending, (state) => {
                state.superadminLoading = true;
            })
            .addCase(updateSuperadmin.fulfilled, (state, action) => {
                state.superadmins = state.superadmins.map((superadmin) =>
                    superadmin._id === action.payload.data._id ? action.payload.data : superadmin
                );
                state.superadminLoading = false;
                state.superadminMessage = "superadmin updated successfully.";
            })
            .addCase(updateSuperadmin.rejected, (state, action) => {
                state.superadminLoading = false;
                state.superadminError = action.payload;
            });

        builder
            .addCase(deleteSuperadmin.pending, (state) => {
                state.superadminLoading = true;
            })
            .addCase(deleteSuperadmin.fulfilled, (state, action) => {
                state.superadmins = action.payload.data;
                state.superadminLoading = false;
                state.superadminMessage = "superadmin deleted successfully.";
            })
            .addCase(deleteSuperadmin.rejected, (state, action) => {
                state.superadminLoading = false;
                state.superadminError = action.payload;
            });

        builder
            .addCase(creditTransfer.pending, (state) => {
                state.superadminLoading = true;
            })
            .addCase(creditTransfer.fulfilled, (state, action) => {
                state.superadmins = action.payload.data;
                state.superadminLoading = false;
                state.superadminMessage = "Credit transferred successfully.";
            })
            .addCase(creditTransfer.rejected, (state, action) => {
                state.superadminLoading = false;
                state.superadminError = action.payload;
            });

        builder
            .addCase(creditAdjust.pending, (state) => {
                state.superadminLoading = true;
            })
            .addCase(creditAdjust.fulfilled, (state, action) => {
                state.superadmins = action.payload.data;
                state.superadminLoading = false;
                state.superadminMessage = "Credit adjustment successful.";
            })
            .addCase(creditAdjust.rejected, (state, action) => {
                state.superadminLoading = false;
                state.superadminError = action.payload;
            });

        builder
            .addCase(toggleUserStatus.pending, (state) => {
                state.superadminLoading = true;
            })
            .addCase(toggleUserStatus.fulfilled, (state, action) => {
                state.superadmins = action.payload.data;
                state.superadminLoading = false;
                state.superadminMessage = "User status updated successfully.";
            })
            .addCase(toggleUserStatus.rejected, (state, action) => {
                state.superadminLoading = false;
                state.superadminError = action.payload;
            });

        builder
            .addCase(getSuperAdminChildren.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(getSuperAdminChildren.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "Admins Children fetched successfully.";
                state.admin = action.payload.data.admin;
                state.children = action.payload.data.children;
            })
            .addCase(getSuperAdminChildren.rejected, (state, action) => {
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
                state.childrenMessage = "Admins Children fetched successfully.";
                state.childrenInfo = action.payload.data;
            })
            .addCase(getChildById.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(createSuperAdminChild.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(createSuperAdminChild.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "Admins Children Create successfully.";
                state.children = action.payload.data;
            })
            .addCase(createSuperAdminChild.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(updateSuperAdminChild.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(updateSuperAdminChild.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "Admins Children Update successfully.";
                state.children = action.payload.data;
            })
            .addCase(updateSuperAdminChild.rejected, (state, action) => {
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
                state.childrenMessage = "Admins Children Delete successfully.";
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
                const { AdminChildren, receiverWallet } = action.payload.data;
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "Admins Children Credit Transfer successfully.";
                state.children = AdminChildren;
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
                state.childrenMessage = "Admins Children Credit Adjust successfully.";
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
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "Admins Children Status updated successfully.";
                state.children = action.payload.data;
            })
            .addCase(toggleChildStatus.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
    }
});

export const { resetsuperadminState,resetData } = superadminSlice.actions;
export default superadminSlice.reducer;
