import { movalbleModalTypes } from "../types/movableModalTypes";

const initialState = {
    modal: null,
};

export const movableModalReducers = (state = initialState, action: any) => {
    switch (action.types) {
        case movalbleModalTypes.SET_MOVALBLE_MODAL:
            return {
                movableModal: action.payload,
            };
        default:
            return state;
    }
};
