import { globalModalTypes } from "../types/globalModalTypes";

const initialState = {
    modal: null,
};

const globalModalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case globalModalTypes.SET_GLOBAL_MODAL:
            return {
                modal: action.payload,
            };

        default:
            return state;
    }
};
export default globalModalReducer;
