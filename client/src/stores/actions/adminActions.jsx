import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT, GET, DELETE, PATCH } from "../../utils/http";
import { handleError } from "../../utils/error";

// Base API endpoint
const ADMIN_API = "/admins";

// ✅ Create Admin
export const createAdmin = createAsyncThunk(
    "admin/create",
    async (adminData, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${ADMIN_API}/create`, adminData);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Fetch All Admins
export const fetchAdmins = createAsyncThunk(
    "admin/getAll",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            //console.log(id,role);
            const { response, json } = await GET(`${ADMIN_API}/all?id=${id}&role=${role}`);
            // const { response, json } = await GET(`${ADMIN_API}/all`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Get Admin by ID
export const fetchAdminByIdAsync = createAsyncThunk(
    "admin/getById",
    async (adminId, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await GET(`${ADMIN_API}/${adminId}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Update Admin
export const updateAdmin = createAsyncThunk(
    "admin/update",
    async ({ adminId, updatedFields }, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await PUT(`${ADMIN_API}/${adminId}?id=${id}&role=${role}`, updatedFields);
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
    "admin/creditTransfer",
    async (transferData, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await POST(`${ADMIN_API}/credit-transfer?id=${id}&role=${role}`, transferData);
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
    "admin/creditAdjust",
    async (adjustData, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await POST(`${ADMIN_API}/credit-adjust?id=${id}&role=${role}`, adjustData);
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
    "admin/toggleStatus",
    async ({ userId, action }, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await PATCH(`${ADMIN_API}/toggle-status/${userId}/${action}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Delete Admin (Soft Delete)
export const deleteAdmin = createAsyncThunk(
    "admin/delete",
    async (adminId, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await DELETE(`${ADMIN_API}/${adminId}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Get admin's children (GET)
export const getAdminChildren = createAsyncThunk(
    "admin/getChildren",
    async (adminId, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`${ADMIN_API}/${adminId}/children`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Create admin's children (POST)
export const createAdminChild = createAsyncThunk(
    "admin/createChild",
    async ({ childAdminData, parentAdminId }, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${ADMIN_API}/${parentAdminId}/children`, childAdminData);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Update admin's children (PUT)
export const updateAdminChild = createAsyncThunk(
    "admin/updateChild",
    async ({ parentAdminId, superdistributorsId, updatedFields }, { rejectWithValue }) => {
        try {
            const { response, json } = await PUT(`${ADMIN_API}/${parentAdminId}/children/${superdistributorsId}`, updatedFields);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


// ✅ Credit Transfer for admin's children (POST)
export const creditTransferToChild = createAsyncThunk(
    "admin/creditTransferToChild",
    async ({ parentAdminId, superdistributorsId, transferData }, { rejectWithValue }) => {
        try {

            const { response, json } = await POST(`${ADMIN_API}/${parentAdminId}/children/${superdistributorsId}/credit-transfer`, transferData);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Credit Adjustment for admin's children (POST)
export const creditAdjustToChild = createAsyncThunk(
    "admin/creditAdjustToChild",
    async ({ any, id, requestData }, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${ADMIN_API}/${any}/children/${id}/credit-adjust`, requestData);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Toggle admin's children status (Activate/Deactivate) (PATCH)
export const toggleChildStatus = createAsyncThunk(
    "admin/toggleChildStatus",
    async ({ userId, adminId, action }, { rejectWithValue }) => {
        try {
            const { response, json } = await PATCH(`${ADMIN_API}/${adminId}/children/${userId}/toggle-status/${action}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Delete admin's children (DELETE)
export const deleteChild = createAsyncThunk(
    "admin/deleteChild",
    async ({ userId, adminId }, { rejectWithValue }) => {
        try {
            const { response, json } = await DELETE(`${ADMIN_API}/${adminId}/children/delete/${userId}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Get admin's children by ID (GET)
export const getChildById = createAsyncThunk(
    "admin/getChildById",
    async ({ any, id }, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`${ADMIN_API}/${any}/children/${id}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);