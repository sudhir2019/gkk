import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, GET } from "../../utils/http";
import { handleError } from "../../utils/error";


export const loadcredit = createAsyncThunk(
    "credit/loadcredit",
    async (id, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`credit/loadcredit?id=${id}`);
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