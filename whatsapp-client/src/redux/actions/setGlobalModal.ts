import { globalModalTypes } from "../types/globalModalTypes";

export const setGlobalModal = (payload: any) => ({
    type: globalModalTypes.SET_GLOBAL_MODAL,
    payload,
});
