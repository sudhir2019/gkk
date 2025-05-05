import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, GET } from "../../utils/http";
import { handleError } from "../../utils/error";

export const loadBalance = createAsyncThunk(
    "app/loadBalance",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const { response, json } = await GET(`funrep/loadBalance?id=${id}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const loadTransferableData = createAsyncThunk(
    "app/loadTransferableData",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const { response, json } = await GET(`funrep/loadTransferable?id=${id}`);
            // console.log(response)
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const loadReceivableData = createAsyncThunk(
    "app/loadReceivableData",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const { response, json } = await GET(`funrep/loadReceivable?id=${id}`);
            // console.log(response)
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const submitReceive = createAsyncThunk(
    "app/submitReceive",
    async ({ userData, receiveData }, { rejectWithValue, getState }) => { // ✅ Fixed typo in receiveData
        try {
            const { authUser } = getState().auth;
            const id = authUser?._id; // ✅ Added optional chaining to avoid errors if authUser is undefined

            if (!id) {
                return rejectWithValue("User ID is missing.");
            }

            if (!receiveData || receiveData.length === 0) {
                return rejectWithValue("No receive data provided.");
            }

            const response = await POST(`funrep/receive`, { id: id, receiveData }); // ✅ Fixed variable name

            if (response.status === 200) {
                const json = await response.json(); // ✅ Ensure response is properly parsed
                return json;
            }

            return rejectWithValue(await response.json());
        } catch (error) {
            return rejectWithValue(error.message || "An unknown error occurred.");
        }
    }
);

export const submitReject = createAsyncThunk(
    "app/submitReject",
    async ({ userData, receiveData }, { rejectWithValue, getState }) => { // ✅ Fixed typo in receiveData
        try {
            const { authUser } = getState().auth;
            const id = authUser?._id; // ✅ Added optional chaining to avoid errors if authUser is undefined

            if (!id) {
                return rejectWithValue("User ID is missing.");
            }

            if (!receiveData || receiveData.length === 0) {
                return rejectWithValue("No receive data provided.");
            }

            const response = await POST(`funrep/reject`, { id: id, receiveData }); // ✅ Fixed variable name

            if (response.status === 200) {
                const json = await response.json(); // ✅ Ensure response is properly parsed
                return json;
            }

            return rejectWithValue(await response.json());
        } catch (error) {
            return rejectWithValue(error.message || "An unknown error occurred.");
        }
    }
);

export const submitCancel = createAsyncThunk(
    "app/submitCancel",
    async ({ userData, transferData }, { rejectWithValue, getState }) => { // ✅ Fixed typo in receiveData
        try {
            const { authUser } = getState().auth;
            const id = authUser?._id; // ✅ Added optional chaining to avoid errors if authUser is undefined

            if (!id) {
                return rejectWithValue("User ID is missing.");
            }

            if (!transferData || transferData.length === 0) {
                return rejectWithValue("No receive data provided.");
            }

            const response = await POST(`funrep/cancel`, { id: id, transferData }); // ✅ Fixed variable name

            if (response.status === 200) {
                const json = await response.json(); // ✅ Ensure response is properly parsed
                return json;
            }

            return rejectWithValue(await response.json());
        } catch (error) {
            return rejectWithValue(error.message || "An unknown error occurred.");
        }
    }
);

export const pointTransfer = createAsyncThunk(
    "app/pointTransfer",
    async ({ receiver_id,amount, pin, password }, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser?._id; // ✅ Avoids errors if `authUser` is undefined

            if (!id) {
                return rejectWithValue("User ID is missing.");
            }

            const { status, json } = await POST(`funrep/pointtransfer`, {
                receiver_id,
                id,
                amount,
                pin,
                password,
            });

            if (status === 200) {
                return json; // ✅ No need for `response.json()`, since it's already parsed
            }

            return rejectWithValue(json);
        } catch (error) {
            return rejectWithValue(error.message || "An unknown error occurred.");
        }
    }
);

export const chnagePassword = createAsyncThunk(
    "app/chnagePassword",
    async ({ newPassword, pin }, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser?._id; // ✅ Avoids errors if `authUser` is undefined

            if (!id) {
                return rejectWithValue("User ID is missing.");
            }
            const { status, json } = await POST(`funrep/chnagepassword`, {
                
                id,
                newPassword,
                pin,
                
            });

            if (status === 200) {
                return json; // ✅ No need for `response.json()`, since it's already parsed
            }

            return rejectWithValue(json);
        } catch (error) {
            return rejectWithValue(error.message || "An unknown error occurred.");
        }
    }
);

export const chnagePin = createAsyncThunk(
    "app/chnagePin",
    async ({  oldPin, newPin, password }, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser?._id; // ✅ Avoids errors if `authUser` is undefined

            if (!id) {
                return rejectWithValue("User ID is missing.");
            }
            const { status, json } = await POST(`funrep/changepin`, {
                
                id,
                newPin
                
            });

            if (status === 200) {
                return json; // ✅ No need for `response.json()`, since it's already parsed
            }

            return rejectWithValue(json);
        } catch (error) {
            return rejectWithValue(error.message || "An unknown error occurred.");
        }
    }
);

export const loadUsers = createAsyncThunk(
    "app/loadUsers",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const { response, json } = await GET(`funrep/loadusers?id=${id}`);
            // console.log(response)
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const resetPinPassword = createAsyncThunk(
    "app/resetPinPassword",
    async (userList, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const { response, json } = await POST(`funrep/resetpinpassword`,{userList});
            // console.log(response)
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const sendContact = createAsyncThunk(
    "app/sendContact",
    async (form, { rejectWithValue, getState }) => {
        try {
            const { authUser } = getState().auth;
            const id = authUser._id;
            const { response, json } = await POST(`funrep/sendcontact`,{form});
            // console.log(response)
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

