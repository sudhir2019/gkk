import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, GET } from "../../utils/http";
import { handleError } from "../../utils/error";


export const loadGameData = createAsyncThunk(
    "live/loadGameData",
    async ({ adminId, gameId }, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`live/loadgame?adminId=${adminId}&gameId=${gameId}`);
            // console.log(response);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);



export const addBalance = createAsyncThunk(
    "live/addBalance",
    async (data, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`live/addbalance`, data);
            // console.log(response);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const addResult = createAsyncThunk(
    "live/addResult",
    async (data, { rejectWithValue }) => {
        try {
            const { response, json } = await POST(`live/addresult`, data);
            // console.log(response);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);