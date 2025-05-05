import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, GET } from "../../utils/http";
import { handleError } from "../../utils/error";

export const signUpAsync = createAsyncThunk(
    "auth/signUp",
    async (userData, { rejectWithValue }) => {
        try {
            const { response, json } = await POST("auth/signup", userData);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const loginAsync = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const { response, json } = await POST('auth/login', credentials);

            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
)
export const getSessionAsync = createAsyncThunk(
    "auth/getSession",
    async (token, { rejectWithValue }) => {
        try {
            const { response, json } = await GET("auth/session", { token });
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
export const logoutAsync = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const { response, json } = await GET("auth/logout");
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const getUserByIdAsync = createAsyncThunk(
    "auth/getUserById",
    async (userId, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`auth/userauth/${userId}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);