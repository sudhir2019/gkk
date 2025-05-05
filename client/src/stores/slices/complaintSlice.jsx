import { createSlice } from '@reduxjs/toolkit';

import { createComplaints, fetchComplaints, updateComplaintStatus } from "../actions/complaintsActions"

// Helper function for pending states
const handlePending = (state) => {
    state.isComplaintLoading = true;
    state.complaintError = null;
};
// Helper function for rejected states
const handleRejected = (state, action) => {
    state.isComplaintLoading = false;
    state.complaintError = action.payload || 'An error occurred';
};

const initialState = {
    isComplaintLoading: false,
    complaints: [],
    allComplaints: [],
    complaintMassages: null,
    complaintError: null,
    isComplaintStatusLoading: false,
};

const complaintSlice = createSlice({
    name: 'complaint',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.complaintError = null;
        },
        resetState: (state) => {
            state.isComplaintLoading = false;
            state.complaints = { data: [], pagination: { totalComplaints: 0, currentPage: 1, totalPages: 1, limit: 10 } };
            state.allComplaints = [];
            state.complaintMassages = null;
            state.complaintError = null;
        },
        updatePagination: (state, action) => {
            const { currentPage, totalPages, totalComplaints, limit } = action.payload;
            state.complaints.pagination = { currentPage, totalPages, totalComplaints, limit };
        },
    },
    extraReducers: (builder) => {
        // Fetch complaints
        builder.addCase(fetchComplaints.pending, handlePending);
        builder.addCase(fetchComplaints.fulfilled, (state, action) => {
            state.isComplaintLoading = false;
            state.complaints = action.payload;
        });
        builder.addCase(fetchComplaints.rejected, handleRejected);

        // Update complaint status
        builder.addCase(updateComplaintStatus.pending, handlePending);
        builder.addCase(updateComplaintStatus.fulfilled, (state, action) => {
            const { message, allComplaints } = action.payload;
            state.isComplaintLoading = false;
            state.allComplaints = allComplaints;
            state.complaintMassages = message;
            state.complaints = allComplaints;
        });
        builder.addCase(updateComplaintStatus.rejected, handleRejected);

        builder
        // Create complaint
        builder.addCase(createComplaints.pending, handlePending);
        builder.addCase(createComplaints.fulfilled, (state, action) => {
            state.isComplaintLoading = false;
            state.complaintMassages = action.payload.message;
        });
        builder.addCase(createComplaints.rejected, handleRejected);
    },
});

export const { clearErrors, resetState, updatePagination } = complaintSlice.actions;
export default complaintSlice.reducer;