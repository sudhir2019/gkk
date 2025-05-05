import { createSlice } from "@reduxjs/toolkit";
import {
    fetchAdmins,
    fetchAdminByIdAsync,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    creditTransfer,
    creditAdjust,
    toggleUserStatus,

    getAdminChildren,
    createAdminChild,
    updateAdminChild,
    creditTransferToChild,
    creditAdjustToChild,
    toggleChildStatus,
    deleteChild,
    getChildById
} from "../actions/adminActions";

const adminSlice = createSlice({
    name: "admins",
    initialState: {
        admins: [],
        admin: null,
        adminLoading: false,
        adminError: null,
        adminMessage: null,
        senderAmount: 0,
        receiverAmount: 0,
        children: [],
        childrenInfo: null,
        childrenLoading: false,
        childrenError: null,
        childrenMessage: null,
    },
    reducers: {
        resetAdminState: (state) => {
            state.adminError = null;
            state.adminMessage = null;
        },
        resetData: () => {

            return { admins: [], children: [] }; // Reset state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdmins.pending, (state) => {
                state.adminLoading = true;
            })
            .addCase(fetchAdmins.fulfilled, (state, action) => {
                state.admins = action.payload.data;
                state.adminLoading = false;
                state.adminMessage = "Admins fetched successfully.";
                state.adminError = null;
            })
            .addCase(fetchAdmins.rejected, (state, action) => {
                state.adminLoading = false;
                state.adminError = action.payload;
            });
        builder
            .addCase(createAdmin.pending, (state) => {
                state.adminLoading = true;
            })
            .addCase(createAdmin.fulfilled, (state, action) => {
                state.admins = action.payload.data;
                state.adminLoading = false;
                state.adminMessage = "Admin created successfully.";
            })
            .addCase(createAdmin.rejected, (state, action) => {
                state.adminLoading = false;
                state.adminError = action.payload;
            });

        builder
            .addCase(fetchAdminByIdAsync.pending, (state) => {
                state.adminLoading = true;
            })
            .addCase(fetchAdminByIdAsync.fulfilled, (state, action) => {
                state.admin = action.payload.data;
                state.adminLoading = false;
            })
            .addCase(fetchAdminByIdAsync.rejected, (state, action) => {
                state.adminLoading = false;
                state.adminError = action.payload;
            });

        builder
            .addCase(updateAdmin.pending, (state) => {
                state.adminLoading = true;
            })
            .addCase(updateAdmin.fulfilled, (state, action) => {
                state.admins = action.payload.data;
                state.adminLoading = false;
                state.adminMessage = "Admin updated successfully.";
            })
            .addCase(updateAdmin.rejected, (state, action) => {
                state.adminLoading = false;
                state.adminError = action.payload;
            });

        builder
            .addCase(creditTransfer.pending, (state) => {
                state.adminLoading = true;
            })
            .addCase(creditTransfer.fulfilled, (state, action) => {
                const { admins, receiverWallet, senderWallet } = action.payload.data;
                state.admins = admins;
                state.admin = receiverWallet;
                state.adminLoading = false;
                state.adminMessage = "Credit transferred successfully.";
            })
            .addCase(creditTransfer.rejected, (state, action) => {
                state.adminLoading = false;
                state.adminError = action.payload;
            });
        builder
            .addCase(deleteAdmin.pending, (state) => {
                state.adminLoading = true;
            })
            .addCase(deleteAdmin.fulfilled, (state, action) => {
                state.admins = action.payload.data;
                state.adminLoading = false;
                state.adminMessage = "Admin deleted successfully.";
            })
            .addCase(deleteAdmin.rejected, (state, action) => {
                state.adminLoading = false;
                state.adminError = action.payload;
            });

        builder
            .addCase(creditAdjust.pending, (state) => {
                state.adminLoading = true;
            })
            .addCase(creditAdjust.fulfilled, (state, action) => {
                const { admins, receiver } = action.payload.data;
                state.admins = admins;
                state.admin = receiver;
                state.adminLoading = false;
                state.adminMessage = "Credit adjustment successful.";
            })
            .addCase(creditAdjust.rejected, (state, action) => {
                state.adminLoading = false;
                state.adminError = action.payload;
            });
        builder
            .addCase(toggleUserStatus.pending, (state) => {
                state.adminLoading = true;
            })
            .addCase(toggleUserStatus.fulfilled, (state, action) => {
                state.admins = action.payload.data;
                state.adminLoading = false;
                state.adminMessage = "User status updated successfully.";
            })
            .addCase(toggleUserStatus.rejected, (state, action) => {
                state.adminLoading = false;
                state.adminError = action.payload;
            });

        builder
            .addCase(getAdminChildren.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(getAdminChildren.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "Admins Children fetched successfully.";
                state.admin = action.payload.data.admin;
                state.children = action.payload.data.children;
            })
            .addCase(getAdminChildren.rejected, (state, action) => {
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
            .addCase(createAdminChild.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(createAdminChild.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "Admins Children Create successfully.";
                state.children = action.payload.data;
            })
            .addCase(createAdminChild.rejected, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = action.payload;
            });
        builder
            .addCase(updateAdminChild.pending, (state) => {
                state.childrenLoading = true;
            })
            .addCase(updateAdminChild.fulfilled, (state, action) => {
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "Admins Children Update successfully.";
                state.children = action.payload.data;
            })
            .addCase(updateAdminChild.rejected, (state, action) => {
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
                const { AdminChildren, receiver } = action.payload.data;
                state.childrenLoading = false;
                state.childrenError = null;
                state.childrenMessage = "Admins Children Credit Adjust successfully.";
                state.children = AdminChildren;
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

export const { resetAdminState, resetData } = adminSlice.actions;
export default adminSlice.reducer;
