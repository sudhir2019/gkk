import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT, GET, DELETE, PATCH } from "../../utils/http";
import { handleError } from "../../utils/error";

// Base API endpoint
const retailers_API = "/master";

// ✅ Create retailers
export const createretailers = createAsyncThunk(
    "master/create",
    async (retailersData, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            //console.log(id,role);
            const { response, json } = await POST(`${retailers_API}/create?id=${id}&role=${role}`, retailersData);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Fetch All retailerss
export const fetchretailers = createAsyncThunk(
    "master/getAll",
    async (_, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            //console.log(id,role);
            const { response, json } = await GET(`${retailers_API}/all?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Get retailers by ID
export const fetchretailersByIdAsync = createAsyncThunk(
    "master/getById",
    async (retailersId, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            //console.log(id,role);
            const { response, json } = await GET(`${retailers_API}/${retailersId}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Update retailers
export const updateretailers = createAsyncThunk(
    "master/update",
    async ({ retailersId, updatedFields }, { rejectWithValue , getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            //console.log(id,role);
            const { response, json } = await PUT(`${retailers_API}/${retailersId}?id=${id}&role=${role}`, updatedFields);
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
    "master/creditTransfer",
    async (transferData, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            //console.log(id,role);
            const { response, json } = await POST(`${retailers_API}/credit-transfer?id=${id}&role=${role}`, transferData);
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
    "master/creditAdjust",
    async (adjustData, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            //console.log(id,role);
            const { response, json } = await POST(`${retailers_API}/credit-adjust?id=${id}&role=${role}`, adjustData);
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
    "master/toggleStatus",
    async ({ userId, action }, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            //console.log(id,role);
            const { response, json } = await PATCH(`${retailers_API}/toggle-status/${userId}/${action}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


// ✅ Delete retailers (Soft Delete)
export const deleteretailers = createAsyncThunk(
    "master/delete",
    async (retailersId, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            //console.log(id,role);
            const { response, json } = await DELETE(`${retailers_API}/${retailersId}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Get retailers's children (GET)
export const getretailersChildren = createAsyncThunk(
    "master/getChildren",
    async (retailersId, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`${retailers_API}/${retailersId}/children`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Create retailers's children (POST)
export const createretailersChild = createAsyncThunk(
    "master/createChild",
    async ({ childAdminData, parentAdminId }, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${retailers_API}/${parentAdminId}/children`, childAdminData);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Update retailers's children (PUT)
export const updateretailersChild = createAsyncThunk(
    "master/updateChild",
    async ({ parentAdminId, superdistributorsId, updatedFields }, { rejectWithValue }) => {
        try {
            const { response, json } = await PUT(`${retailers_API}/${parentAdminId}/children/${superdistributorsId}`, updatedFields);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


// ✅ Credit Transfer for retailers's children (POST)
export const creditTransferToChild = createAsyncThunk(
    "master/creditTransferToChild",
    async ({ parentAdminId, superdistributorsId, transferData }, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${retailers_API}/${parentAdminId}/children/${superdistributorsId}/credit-transfer`, transferData);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Credit Adjustment for retailers's children (POST)
export const creditAdjustToChild = createAsyncThunk(
    "master/creditAdjustToChild",
    async ({ any, id, requestData }, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${retailers_API}/${any}/children/${id}/credit-adjust`, requestData);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Toggle retailers's children status (Activate/Deactivate) (PATCH)
export const toggleChildStatus = createAsyncThunk(
    "master/toggleChildStatus",
    async ({ userId, adminId, action }, { rejectWithValue }) => {
        try {

            const { response, json } = await PATCH(`${retailers_API}/${adminId}/children/${userId}/toggle-status/${action}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Delete retailers's children (DELETE)
export const deleteChild = createAsyncThunk(
    "master/deleteChild",
    async ({ userId, adminId }, { rejectWithValue }) => {
        try {
            const { response, json } = await DELETE(`${retailers_API}/${adminId}/children/delete/${userId}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Get retailers's children by ID (GET)
export const getChildById = createAsyncThunk(
    "master/getChildById",
    async ({ any, id }, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`${retailers_API}/${any}/children/${id}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
