import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT, GET, DELETE, PATCH } from "../../utils/http";
import { handleError } from "../../utils/error";

// Base API endpoint
const users_API = "/otc";

// ✅ Create users
export const createusers = createAsyncThunk(
    "otc/create",
    async (usersData, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await POST(`${users_API}/create?id=${id}&role=${role}`, usersData);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Fetch All userss
export const fetchusers = createAsyncThunk(
    "otc/getAll",
    async (_, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            //console.log(id,role);
            const { response, json } = await GET(`${users_API}/all?id=${id}&role=${role}`);


            // const { response, json } = await GET(`${users_API}/all`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Get users by ID
export const fetchusersByIdAsync = createAsyncThunk(
    "otc/getById",
    async (usersId, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await GET(`${users_API}/${usersId}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Update users
export const updateusers = createAsyncThunk(
    "otc/update",
    async ({ usersId, updatedFields }, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await PUT(`${users_API}/${usersId}?id=${id}&role=${role}`, updatedFields);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Credit Transfer
export const creditTransfer = createAsyncThunk(
    "otc/creditTransfer",
    async (transferData, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await POST(`${users_API}/credit-transfer?id=${id}&role=${role}`, transferData);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Credit Adjustment
export const creditAdjust = createAsyncThunk(
    "otc/creditAdjust",
    async (adjustData, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await POST(`${users_API}/credit-adjust?id=${id}&role=${role}`, adjustData);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


// ✅ Toggle User Status (Activate/Deactivate)
export const toggleUserStatus = createAsyncThunk(
    "otc/toggleStatus",
    async ({ userId, action }, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await PATCH(`${users_API}/toggle-status/${userId}/${action}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


// ✅ Delete users (Soft Delete)
export const deleteusers = createAsyncThunk(
    "otc/delete",
    async (usersId, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await DELETE(`${users_API}/${usersId}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const loadcredit = createAsyncThunk(
    "otc/loadcredit",
    async (id, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await GET(`${users_API}/loadcredit/${id}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);