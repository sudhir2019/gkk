import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT, GET, DELETE } from "../../utils/http";
import { handleError } from "../../utils/error";

// Async Thunks

export const fetchTimes = createAsyncThunk(
    "games/fetchTimes",
    async (_, { rejectWithValue }) => {
        try {
            const { response, json } = await GET("time/timelist");
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


export const fetchGames = createAsyncThunk(
    "games/fetchGames",
    async (_, { rejectWithValue }) => {
        try {
            const { response, json } = await GET("game/");
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const createGame = createAsyncThunk(
    "games/createGame",
    async (formData, { rejectWithValue }) => {
        try {
            // Send the FormData to the server via a POST request
            const { response, json } = await POST("game", formData, "formData", "");
            // Successful response
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            // Catch any error during the request
            return rejectWithValue(handleError(error));
        }
    }
);


export const updateGame = createAsyncThunk(
    "games/updateGame",
    async ({ gameId, gameData }, { rejectWithValue }) => {
        try {
            const { response, json } = await PUT(`game/${gameId}`, gameData);
            // Successful response
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const deleteGame = createAsyncThunk(
    "games/deleteGame",
    async (gameId, { rejectWithValue }) => {
        try {
            const { response, json } = await DELETE(`game/:${gameId}`);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const activateGameAsync = createAsyncThunk(
    'games/:id/:action',
    async ({ gameId, action }, { rejectWithValue }) => {
        try {
            const { response, json } = await PUT(`game/:${gameId}/${action}`); // Adjust `info` if backend requires it
            if (response.status === 200) {
                return response.data;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const fetchGamesByUser = createAsyncThunk(
    'fetchGamesByUser', // action type
    async (userId, { rejectWithValue }) => {
        try {
            const { response, json } = await GET(`game/usergames/${userId}`);
            if (response.status === 200) {
                return response.data;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
