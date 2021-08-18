import { roomModalTypes } from "../types/roomModalTypes";

const initialState = {
    modal: null,
};

export const roomModalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case roomModalTypes.SET_ROOM_MODAL:
            return {
                ...state,
                modal: action.payload,
            };
        default:
            return state;
    }
};
