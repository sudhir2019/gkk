import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST } from "../../utils/http";
import { handleError } from "../../utils/error";

// Fetch all logs
export const getAllLogs = createAsyncThunk(
    "logs/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`/logs`);
            if (response.status === 200) return json;
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Fetch logs by user ID
export const fetchUserLogs = createAsyncThunk(
    "logs/getByUserId",
    async (userId, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`/logs/${userId}`);
            if (response.status === 200) return json;
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Fetch log by log ID
export const fetchLogById = createAsyncThunk(
    "logs/getById",
    async (logId, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`/logs/getUserLogById/${logId}`);
            if (response.status === 200) return json;
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Log user activity
export const logUserActivity = createAsyncThunk(
    "logs/logActivity",
    async (activityData, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`/logs/logUserActivity`, activityData);
            if (response.status === 201) return json;
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Fetch all activity logs
export const fetchActivityLogs = createAsyncThunk(
    "logs/getActivityLogs",
    async (_, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`/logs/activityLogs`);
            if (response.status === 200) return json;
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
