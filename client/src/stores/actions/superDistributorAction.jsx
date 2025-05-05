import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT, GET, DELETE, PATCH } from "../../utils/http";
import { handleError } from "../../utils/error";

// Base API endpoint
const superdistributors_API = "/superareamanager";

// ✅ Create superdistributors
export const createsuperdistributors = createAsyncThunk(
    "superareamanager/create",
    async (superdistributorsData, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await POST(`${superdistributors_API}/create?id=${id}&role=${role}`, superdistributorsData);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Fetch All superdistributorss
export const fetchsuperdistributorss = createAsyncThunk(
    "superareamanager/getAll",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            //console.log(id,role);
            const { response, json } = await GET(`${superdistributors_API}/all?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Get superdistributors by ID
export const fetchsuperdistributorsByIdAsync = createAsyncThunk(
    "superareamanager/getById",
    async (superdistributorsId, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await GET(`${superdistributors_API}/${superdistributorsId}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Update superdistributors
export const updatesuperdistributors = createAsyncThunk(
    "superareamanager/update",
    async ({ superdistributorsId, updatedFields }, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await PUT(`${superdistributors_API}/${superdistributorsId}?id=${id}&role=${role}`, updatedFields);
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
    "superareamanager/creditTransfer",
    async (transferData, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await POST(`${superdistributors_API}/credit-transfer?id=${id}&role=${role}`, transferData);
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
    "superareamanager/creditAdjust",
    async (adjustData, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await POST(`${superdistributors_API}/credit-adjust?id=${id}&role=${role}`, adjustData);
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
    "superareamanager/toggleStatus",
    async ({ userId, action }, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await PATCH(`${superdistributors_API}/toggle-status/${userId}/${action}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


// ✅ Delete superdistributors (Soft Delete)
export const deletesuperdistributors = createAsyncThunk(
    "superareamanager/delete",
    async (superdistributorsId, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await DELETE(`${superdistributors_API}/${superdistributorsId}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


// ✅ Get superdistributors's children (GET)
export const getsuperdistributorsChildren = createAsyncThunk(
    "superareamanager/getChildren",
    async (superdistributorsId, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`${superdistributors_API}/${superdistributorsId}/children`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Create superdistributors's children (POST)
export const createsuperdistributorsChild = createAsyncThunk(
    "superareamanager/createChild",
    async ({ childAdminData, parentAdminId }, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${superdistributors_API}/${parentAdminId}/children`, childAdminData);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Update superdistributors's children (PUT)
export const updatesuperdistributorsChild = createAsyncThunk(
    "superareamanager/updateChild",
    async ({ parentAdminId, superdistributorsId, updatedFields }, { rejectWithValue }) => {
        try {
            const { response, json } = await PUT(`${superdistributors_API}/${parentAdminId}/children/${superdistributorsId}`, updatedFields);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


// ✅ Credit Transfer for superdistributors's children (POST)
export const creditTransferToChild = createAsyncThunk(
    "superareamanager/creditTransferToChild",
    async ({ parentAdminId, superdistributorsId, transferData }, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${superdistributors_API}/${parentAdminId}/children/${superdistributorsId}/credit-transfer`, transferData);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Credit Adjustment for superdistributors's children (POST)
export const creditAdjustToChild = createAsyncThunk(
    "superareamanager/creditAdjustToChild",
    async ({ any, id, requestData }, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${superdistributors_API}/${any}/children/${id}/credit-adjust`, requestData);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Toggle superdistributors's children status (Activate/Deactivate) (PATCH)
export const toggleChildStatus = createAsyncThunk(
    "superareamanager/toggleChildStatus",
    async ({ userId, adminId, action }, { rejectWithValue }) => {
        try {

            const { response, json } = await PATCH(`${superdistributors_API}/${adminId}/children/${userId}/toggle-status/${action}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Delete superdistributors's children (DELETE)
export const deleteChild = createAsyncThunk(
    "superareamanager/deleteChild",
    async ({ userId, adminId }, { rejectWithValue }) => {
        try {
            const { response, json } = await DELETE(`${superdistributors_API}/${adminId}/children/delete/${userId}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Get superdistributors's children by ID (GET)
export const getsuperDistributorsChildById = createAsyncThunk(
    "superareamanager/getChildById",
    async ({ any, id }, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`${superdistributors_API}/${any}/children/${id}`);
            if (response.status === 200) {

                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);