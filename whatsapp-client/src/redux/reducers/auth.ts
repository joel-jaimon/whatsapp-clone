import { authTypes } from "../types/authTypes";
import dummyAuth from "../../data/temp/auth.json";

const initialState = {
    auth: dummyAuth,
};

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case authTypes.SET_AUTH_USER:
            return {
                auth: action.payload,
            };
        default:
            return state;
    }
};
