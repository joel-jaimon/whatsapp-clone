import { movalbleModalTypes } from "../types/movableModalTypes";

export const setMovableModal = (payload: any) => {
    return {
        type: movalbleModalTypes.SET_MOVALBLE_MODAL,
        payload,
    };
};
