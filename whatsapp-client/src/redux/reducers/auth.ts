// import { authTypes } from "../types/authTypes";
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

// export const authReducer = (state = initialState, action: any) => {
//     switch (action.type) {
//         case authTypes.SET_AUTH_USER:
//             return {
//                 auth: action.payload,
//             };
//         default:
//             return state;
//     }
// };
