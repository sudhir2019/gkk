import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET } from "../../utils/http";
import { handleError } from "../../utils/error";

// Async Thunks
export const fetchTurnOverReport = createAsyncThunk(
    "fetchTurnOverReport",
    async ({ role, id, startDate, endDate }, { getState, rejectWithValue }) => {
        try {
            // Get token and current user data from the store
            const state = getState();
            const { token, authUser } = state.auth;
            const currentRole = authUser?.role;
            const userId = authUser?._id;

            // Use the provided role and id or fallback to the current user's role and id
            const { response, json } = await GET(
                `reports/turnoverreport?role=${role || currentRole}&id=${id || userId}&startDate=${startDate}&endDate=${endDate}`,
                token
            );

            // Successful response
            if (response.status === 200) {
                return json;
            }

            // Handle error if status is not 200
            return rejectWithValue(handleError(json));

        } catch (error) {
            // Catch any errors and handle them
            return rejectWithValue(handleError(error));
        }
    }
);



export const findallusers = createAsyncThunk(
    "findallusers",
    async (_, { getState, rejectWithValue }) => {
        try {
            // Get token and current user data from the store
            const state = getState();
            const { token, authUser } = state.auth;
            const currentRole = authUser?.role;
            const userId = authUser?._id;

            // Use the provided role and id or fallback to the current user's role and id
            const { response, json } = await GET(
                `reports/findallusers?role=${currentRole}&id=${userId}`,
                token
            );

            // Successful response
            if (response.status === 200) {
                return json;
            }

            // Handle error if status is not 200
            return rejectWithValue(handleError(json));

        } catch (error) {
            // Catch any errors and handle them
            return rejectWithValue(handleError(error));
        }
    }
);



export const transactionreport = createAsyncThunk(
    "transactionreport",
    async ({ status, userId, date,type }, { getState, rejectWithValue }) => {
        try {
            // Get token and current user data from the store
            const state = getState();
            const { token, authUser } = state.auth;
            const currentRole = authUser?.role;
            const cid = authUser?._id;

            // Use the provided role and id or fallback to the current user's role and id
            const { response, json } = await GET(
                `reports/transactionreport?status=${status}&id=${userId}&date=${date}&currentid=${cid}&type=${type}&role=${currentRole}`,
                token
            );

            // Successful response
            if (response.status === 200) {
                return json;
            }

            // Handle error if status is not 200
            return rejectWithValue(handleError(json));

        } catch (error) {
            // Catch any errors and handle them
            return rejectWithValue(handleError(error));
        }
    }
);


export const commissionpayout = createAsyncThunk(
    "commissionpayout",
    async (_, { getState, rejectWithValue }) => {
        try {
            // Get token and current user data from the store
            const state = getState();
            const { token, authUser } = state.auth;
            const currentRole = authUser?.role;
            const userId = authUser?._id;

            // Use the provided role and id or fallback to the current user's role and id
            const { response, json } = await GET(
                `reports/commissionpayout?role=${currentRole}&id=${userId}`,
                token
            );

            // Successful response
            if (response.status === 200) {
                return json;
            }

            // Handle error if status is not 200
            return rejectWithValue(handleError(json));

        } catch (error) {
            // Catch any errors and handle them
            return rejectWithValue(handleError(error));
        }
    }
);


export const fetchadmincommision = createAsyncThunk(
    "fetchadmincommision",
    async ({ role, id, startDate, endDate }, { getState, rejectWithValue }) => {
        try {
            // Get token and current user data from the store
            const state = getState();
            const { token, authUser } = state.auth;
            const currentRole = authUser?.role;
            const userId = authUser?._id;

            // Use the provided role and id or fallback to the current user's role and id
            const { response, json } = await GET(
                `reports/admincommissionpayout?role=${role || currentRole}&id=${id || userId}&startDate=${startDate}&endDate=${endDate}`,
                token
            );

            // Successful response
            if (response.status === 200) {
                return json;
            }

            // Handle error if status is not 200
            return rejectWithValue(handleError(json));

        } catch (error) {
            // Catch any errors and handle them
            return rejectWithValue(handleError(error));
        }
    }
);

