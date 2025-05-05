import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET } from "../../utils/http";
import { handleError } from "../../utils/error";


export const fetchronlinePlayer = createAsyncThunk(
    "onlineplayer/getAllonlineplayers",
    async (_, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`onlinePlayer`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);