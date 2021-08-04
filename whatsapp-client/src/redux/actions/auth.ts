import { authTypes } from "../types/authTypes";

export const setAuthState = (payload: any) => ({
    type: authTypes.SET_AUTH_USER,
    payload,
});
