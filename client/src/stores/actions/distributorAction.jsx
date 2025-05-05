import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT, GET, DELETE, PATCH } from "../../utils/http";
import { handleError } from "../../utils/error";

// Base API endpoint
const distributors_API = "/areamanager";

// ✅ Create distributors
export const createdistributors = createAsyncThunk(
    "areamanager/create",
    async (distributorsData, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await POST(`${distributors_API}/create?id=${id}&role=${role}`, distributorsData);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Fetch All distributorss
export const fetchdistributorss = createAsyncThunk(
    "areamanager/getAll",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            //console.log(id,role);
            const { response, json } = await GET(`${distributors_API}/all?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Get distributors by ID
export const fetchdistributorsByIdAsync = createAsyncThunk(
    "areamanager/getById",
    async (distributorsId, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await GET(`${distributors_API}/${distributorsId}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Update distributors
export const updatedistributors = createAsyncThunk(
    "areamanager/update",
    async ({ distributorsId, updatedFields }, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await PUT(`${distributors_API}/${distributorsId}?id=${id}&role=${role}`, updatedFields);
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
    "areamanager/creditTransfer",
    async (transferData, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await POST(`${distributors_API}/credit-transfer?id=${id}&role=${role}`, transferData);
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
    "areamanager/creditAdjust",
    async (adjustData, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await POST(`${distributors_API}/credit-adjust?id=${id}&role=${role}`, adjustData);
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
    "areamanager/toggleStatus",
    async ({ userId, action }, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await PATCH(`${distributors_API}/toggle-status/${userId}/${action}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


// ✅ Delete distributors (Soft Delete)
export const deletedistributors = createAsyncThunk(
    "areamanager/delete",
    async (distributorsId, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await DELETE(`${distributors_API}/${distributorsId}?id=${id}&role=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


// ✅ Get distributor's children (GET)
export const getdistributorChildren = createAsyncThunk(
    "areamanager/getChildren",
    async (distributorId, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`${distributors_API}/${distributorId}/children`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Create distributor's children (POST)
export const createdistributorChild = createAsyncThunk(
    "areamanager/createChild",
    async ({ childAdminData, parentAdminId }, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${distributors_API}/${parentAdminId}/children`, childAdminData);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Update distributor's children (PUT)
export const updatedistributorChild = createAsyncThunk(
    "areamanager/updateChild",
    async ({ parentAdminId, superdistributorsId, updatedFields }, { rejectWithValue }) => {
        try {
            const { response, json } = await PUT(`${distributors_API}/${parentAdminId}/children/${superdistributorsId}`, updatedFields);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


// ✅ Credit Transfer for distributor's children (POST)
export const creditTransferToChild = createAsyncThunk(
    "areamanager/creditTransferToChild",
    async ({ parentdistributorId, superdistributorsId, transferData }, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${distributors_API}/${parentdistributorId}/children/${superdistributorsId}/credit-transfer`, transferData);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Credit Adjustment for distributor's children (POST)
export const creditAdjustToChild = createAsyncThunk(
    "areamanager/creditAdjustToChild",
    async ({ any, id, requestData }, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${distributors_API}/${any}/children/${id}/credit-adjust`, requestData);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Toggle distributor's children status (Activate/Deactivate) (PATCH)
export const toggleChildStatus = createAsyncThunk(
    "areamanager/toggleChildStatus",
    async ({ userId, adminId, action }, { rejectWithValue }) => {
        try {

            const { response, json } = await PATCH(`${distributors_API}/${adminId}/children/${userId}/toggle-status/${action}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Delete distributor's children (DELETE)
export const deleteChild = createAsyncThunk(
    "areamanager/deleteChild",
    async ({ userId, adminId }, { rejectWithValue }) => {
        try {
            const { response, json } = await DELETE(`${distributors_API}/${adminId}/children/delete/${userId}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// ✅ Get distributor's children by ID (GET)
export const getChildById = createAsyncThunk(
    "areamanager/getChildById",
    async ({ any, id }, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`${distributors_API}/${any}/children/${id}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);