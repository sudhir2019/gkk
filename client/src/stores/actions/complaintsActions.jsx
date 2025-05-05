import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT, GET, DELETE, PATCH } from "../../utils/http";
import { handleError } from "../../utils/error";


export const createComplaints = createAsyncThunk(
    "complaints/create",
    async (complaintData, { rejectWithValue }) => {
        try {
            const { response, json } = await POST("complaint", complaintData);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


export const fetchComplaints = createAsyncThunk(
    "complaints/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const { response, json } = await GET("complaint");
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const updateComplaintStatus = createAsyncThunk(
    "complaints/updateStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const { response, json } = await PATCH(`complaint/${id}/status`, { status });
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
