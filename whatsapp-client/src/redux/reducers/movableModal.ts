import { movalbleModalTypes } from "../types/movableModalTypes";

const initialState = {
    modal: null,
};

export const movableModalReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case movalbleModalTypes.SET_MOVALBLE_MODAL:
            return {
                ...state,
                modal: action.payload,
            };
        default:
            return state;
    }
};
