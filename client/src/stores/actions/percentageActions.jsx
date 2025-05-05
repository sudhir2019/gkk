import { createAsyncThunk } from "@reduxjs/toolkit";
import { PUT, GET } from "../../utils/http";
import { handleError } from "../../utils/error";

// Base API endpoint

const percentage_API = "/percentage";


export const fetchGamepercentageByAdmin = createAsyncThunk(
    'percentage/fetchGamepercentageByAdmin', // action type
    async (id, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`${percentage_API}/usergames/${id}`);
            if (response.status === 200) {
                return response.data;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// updateWinpercentageBulk
export const updateWinpercentageBulk = createAsyncThunk(
    'percentage/updateWinpercentageBulk', // action type
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const { response, json } = await PUT(`${percentage_API}/bulk/winpercentage/${id}`, data);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);