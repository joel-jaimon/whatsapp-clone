import dummyAuth from "../../data/temp/auth.json";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: dummyAuth,
};

export const authSlice = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        setAuthState: (state, action) => {
            state.auth = action.payload;
        },
    },
});

export const { setAuthState } = authSlice.actions;
