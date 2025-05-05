import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT, GET, DELETE } from "../../utils/http";
import { handleError } from "../../utils/error";

// Async Thunks
export const fetchSuperAdmins = createAsyncThunk(
    "fetchSuperAdmins",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;

            const { response, json } = await GET("super/",);
            // Successful response
            // console.log(json);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const deleteSuperAdmin = createAsyncThunk(
    "deleteSuperAdmin",
    async (id, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await DELETE(`super/${id}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const fetchAdmins = createAsyncThunk(
    "fetchAdmins",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;

            const { response, json } = await GET(`admins?id=${id}&currentrole=${role}`);
            // Successful response
            // console.log(json);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const deleteAdmins = createAsyncThunk(
    "deleteAdmins",
    async (id, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await DELETE(`admins/${id}?currentrole=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const fetchSuperDistributors = createAsyncThunk(
    "fetchSuperDistributors",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await GET(`superdistributors?id=${id}&currentrole=${role}`);

            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const deleteSuperDistributors = createAsyncThunk(
    "deleteSuperDistributors",
    async (id, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;

            const { response, json } = await DELETE(`superdistributors/${id}?currentrole=${role}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const fetchDistributors = createAsyncThunk(
    "fetchDistributors",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const role = authUser.role;
            const { response, json } = await GET(`distibutors?id=${id}&currentrole=${role}`);
            // Successful response
            // console.log(json);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const deleteDistributors = createAsyncThunk(
    "deleteDistributors",
    async (id, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const { token, authUser } = state.auth;
            const cuurentRole = authUser.role;
            const id = authUser._id;

            // console.log(token);
            // if (!token) {
            //     return rejectWithValue("Please log in to access games");
            // }


            const { response, json } = await DELETE(`distibutors/${id}?currentrole=${cuurentRole}`, token);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const fetchRetailers = createAsyncThunk(
    "fetchRetailers",
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();

            const { token, authUser } = state.auth;
            const cuurentRole = authUser.role;
            const id = authUser._id;


            const { response, json } = await GET(`retailers?id=${id}&currentrole=${cuurentRole}`, token);
            // Successful response
            // console.log(json);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const deleteRetailers = createAsyncThunk(
    "deleteRetailers",
    async (id, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const { token, authUser } = state.auth;
            const cuurentRole = authUser.role;
            const id = authUser._id;

            // console.log(token);
            // if (!token) {
            //     return rejectWithValue("Please log in to access games");
            // }

            const { response, json } = await DELETE(`retailers/${id}?currentrole=${cuurentRole}`, token);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const fetchUsers = createAsyncThunk(
    "fetchUsers",
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const { token } = state.auth;
            // console.log(token);
            // if (!token) {
            //     return rejectWithValue("Please log in to access games");
            // }

            const { response, json } = await GET("allusers/", token);
            // Successful response
            // console.log(json);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const deleteUsers = createAsyncThunk(
    "deleteUsers",
    async (id, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const { token } = state.auth;
            // console.log(token);
            // if (!token) {
            //     return rejectWithValue("Please log in to access games");
            // }

            const { response, json } = await DELETE(`allusers/${id}`, token);
            // Successful response
            // console.log(json);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const fetchUserById = createAsyncThunk(
    "fetchUserById",
    async (id, { getState, rejectWithValue }) => {
        try {
            const state = getState();

            const { token, authUser } = state.auth;
            const cuurentRole = authUser?.role;
            // const ids = authUser._id;

            // console.log(authUser.role);

            // if (!token) {
            //     return rejectWithValue("Please log in to access games");
            // }
            let jsons;
            if (authUser.role !== undefined) {
                const { response, json } = await GET(`fetchUserById?id=${id}&currentrole=${cuurentRole}`, token);
                // Successful response
                // console.log(json);
                jsons = json;
                if (response.status === 200) {
                    return json;
                }
            }

            return rejectWithValue(handleError(jsons));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const fetchUserCount = createAsyncThunk(
    'super/fetchUserCount',
    async (role, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const { token, authUser } = state.auth;
            let id = authUser._id;
            let rolues = authUser.role;
            // Modify the API request to include role in query params
            let jsons = "";
            if (rolues !== undefined) {
                const { response, json } = await GET(`counts/usercount?role=${rolues}&id=${id}&currentrole=${rolues}`, token);
                jsons = json
                if (response.status === 200) {
                    return json;
                }
            }
            return rejectWithValue(handleError(jsons));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);