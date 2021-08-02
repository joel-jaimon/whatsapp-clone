import { globalModalTypes } from "../types/globalModalTypes";

export const setGlobalModal = (modal: any) => ({
    type: globalModalTypes.SET_GLOBAL_MODAL,
    payload: modal,
});
