import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT, GET, DELETE, PATCH } from "../../utils/http";
import { handleError } from "../../utils/error";

// Base API endpoint
const users_API = "/users";

// // ✅ Create users
// export const createusers = createAsyncThunk(
//     "users/create",
//     async (usersData, { rejectWithValue }) => {
//         try {
//             const { response, json } = await POST(`${users_API}/create`, usersData);
//             if (response.status === 201) {
//                 return json;
//             }
//             return rejectWithValue(handleError(json));
//         } catch (error) {
//             return rejectWithValue(handleError(error));
//         }
//     }
// );

// ✅ Fetch All userss
export const fetchusers = createAsyncThunk(
    "users/getAll",
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
// export const fetchusersByIdAsync = createAsyncThunk(
//     "users/getById",
//     async (usersId, { rejectWithValue }) => {
//         try {
//             const { response, json } = await GET(`${users_API}/${usersId}`);
//             if (response.status === 200) {
//                 return json;
//             }
//             return rejectWithValue(handleError(json));
//         } catch (error) {
//             return rejectWithValue(handleError(error));
//         }
//     }
// );

// ✅ Update users
// export const updateusers = createAsyncThunk(
//     "users/update",
//     async ({ usersId, updatedFields }, { rejectWithValue }) => {
//         try {
//             const { response, json } = await PUT(`${users_API}/${usersId}`, updatedFields);
//             if (response.status === 200) {
//                 return json;
//             }
//             return rejectWithValue(handleError(json));
//         } catch (error) {
//             return rejectWithValue(handleError(error));
//         }
//     }
// );

// ✅ Credit Transfer
// export const creditTransfer = createAsyncThunk(
//     "users/creditTransfer",
//     async (transferData, { rejectWithValue }) => {
//         try {
//             const { response, json } = await POST(`${users_API}/credit-transfer`, transferData);
//             if (response.status === 200) {
//                 return json;
//             }
//             return rejectWithValue(handleError(json));
//         } catch (error) {
//             return rejectWithValue(handleError(error));
//         }
//     }
// );

// ✅ Credit Adjustment
export const creditAdjust = createAsyncThunk(
    "users/creditAdjust",
    async (adjustData, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`${users_API}/credit-adjust`, adjustData);
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
    "users/toggleStatus",
    async ({ userId, action }, { rejectWithValue }) => {
        try {
            const { response, json } = await PATCH(`${users_API}/toggle-status/${userId}/${action}`);
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
    "users/delete",
    async (usersId, { rejectWithValue }) => {
        try {
            const { response, json } = await DELETE(`${users_API}/${usersId}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


