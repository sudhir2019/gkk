import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT, GET, DELETE, PATCH } from "../../utils/http";
import { handleError } from "../../utils/error";

// Base API endpoint
const superadmin_API = "/superadmins";

// ✅ Create superadmin
export const createSuperAdmin = createAsyncThunk(
    "superadmin/create",
    async (superadminData, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await POST(`${superadmin_API}/create?id=${id}&role=${role}`, superadminData);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
// ✅ Fetch All superadmins
export const fetchSuperadmins = createAsyncThunk(
    "superadmin/getAll",
    async (_, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await GET(`${superadmin_API}/all?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Get superadmin by ID
export const fetchSuperadminByIdAsync = createAsyncThunk(
    "superadmin/getById",
    async (superadminId, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await GET(`${superadmin_API}/${superadminId}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Update superadmin
export const updateSuperadmin = createAsyncThunk(
    "superadmin/update",
    async ({ superadminId, updateData }, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await PUT(`${superadmin_API}/${superadminId}?id=${id}&role=${role}`, updateData);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Delete superadmin (Soft Delete)
export const deleteSuperadmin = createAsyncThunk(
    "superadmin/delete",
    async (superadminId, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const response = await DELETE(`${superadmin_API}/${superadminId}?id=${id}&role=${role}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Credit Transfer
export const creditTransfer = createAsyncThunk(
    "superadmin/creditTransfer",
    async (transferData, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const response = await POST(`${superadmin_API}/credit-transfer?id=${id}&role=${role}`, transferData);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Credit Adjustment
export const creditAdjust = createAsyncThunk(
    "superadmin/creditAdjust",
    async (adjustData, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const response = await POST(`${superadmin_API}/credit-adjust?id=${id}&role=${role}`, adjustData);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Toggle User Status (Activate/Deactivate)
export const toggleUserStatus = createAsyncThunk(
    "superadmin/toggleStatus",
    async ({ userId, action }, { rejectWithValue, getState }) => {
        try {

            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const response = await PATCH(`${superadmin_API}/toggle-status/${userId}/${action}?id=${id}&role=${role}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Get Superadmin's children (GET)
export const getSuperAdminChildren = createAsyncThunk(
    "superadmin/getChildren",
    async (adminId, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`${superadmin_API}/${adminId}/children`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Create Superadmin's children (POST)
export const createSuperAdminChild = createAsyncThunk(
    "superadmin/createChild",
    async ({ childAdminData, parentAdminId }, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${superadmin_API}/${parentAdminId}/children`, childAdminData);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Update Superadmin's children (PUT)
export const updateSuperAdminChild = createAsyncThunk(
    "superadmin/updateChild",
    async ({ parentAdminId, superdistributorsId, updatedFields }, { rejectWithValue }) => {
        try {
            const { response, json } = await PUT(`${superadmin_API}/${parentAdminId}/children/${superdistributorsId}`, updatedFields);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


// ✅ Credit Transfer for Superadmin's children (POST)
export const creditTransferToChild = createAsyncThunk(
    "superadmin/creditTransferToChild",
    async ({ parentAdminId, superdistributorsId, transferData }, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${superadmin_API}/${parentAdminId}/children/${superdistributorsId}/credit-transfer`, transferData);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Credit Adjustment for Superadmin's children (POST)
export const creditAdjustToChild = createAsyncThunk(
    "superadmin/creditAdjustToChild",
    async ({ any, id, requestData }, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${superadmin_API}/${any}/children/${id}/credit-adjust`, requestData);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Toggle Superadmin's children status (Activate/Deactivate) (PATCH)
export const toggleChildStatus = createAsyncThunk(
    "superadmin/toggleChildStatus",
    async ({ userId, adminId, action }, { rejectWithValue }) => {
        try {

            const { response, json } = await PATCH(`${superadmin_API}/${adminId}/children/${userId}/toggle-status/${action}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Delete Superadmin's children (DELETE)
export const deleteChild = createAsyncThunk(
    "superadmin/deleteChild",
    async ({ userId, adminId }, { rejectWithValue }) => {
        try {
            const { response, json } = await DELETE(`${superadmin_API}/${adminId}/children/delete/${userId}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Get Superadmin's children by ID (GET)
export const getChildById = createAsyncThunk(
    "superadmin/getChildById",
    async ({ any, id }, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`${superadmin_API}/${any}/children/${id}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);