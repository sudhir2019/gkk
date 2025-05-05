import { createSlice } from "@reduxjs/toolkit";
import { clearToken, clearAuthData } from "../../utils/authUtils";
import { commissionpayout, fetchTurnOverReport, findallusers, transactionreport, fetchadmincommision } from "../actions/reportActions";



const reportSlice = createSlice({
    name: "reports",
    initialState: {
        turnoverdata: [],
        roles: "",
        allusers: [],
        transactionData: [],
        commissionData: [],
        admincommissiondata: [],
    },
    reducers: {
        resetAuthState: () => {
            clearAuthData(); // Clear localStorage and cookies
            return { turnoverdata: [], allusers: [], transactionData: [], commissionData: [], admincommissiondata: [] }; // Reset state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTurnOverReport.fulfilled, (state, action) => {
                // console.log('data:', action.payload);
                state.roles = action.payload.role
                state.turnoverdata = action.payload.data; // Ensure payload structure
            });

        builder
            .addCase(findallusers.fulfilled, (state, action) => {
                // console.log('data:', action.payload);

                state.allusers = action.payload.data; // Ensure payload structure
            })


        builder
            .addCase(transactionreport.fulfilled, (state, action) => {
                // console.log('data:', action.payload);

                state.transactionData = action.payload.data; // Ensure payload structure
            })

        builder
            .addCase(commissionpayout.fulfilled, (state, action) => {
                // console.log('data:', action.payload);

                state.commissionData = action.payload.data; // Ensure payload structure
            })
        builder
            .addCase(fetchadmincommision.fulfilled, (state, action) => {
                // console.log('data:', action.payload);

                state.admincommissiondata = action.payload.data; // Ensure payload structure
            })
    }
});

export const { resetAuthState } = reportSlice.actions;
export default reportSlice.reducer;