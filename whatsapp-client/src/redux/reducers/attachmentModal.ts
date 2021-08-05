import { attachmentModalTypes } from "../types/attachmentModal";

const initialState = {
    modal: null,
};

export const attachmentModalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case attachmentModalTypes.SET_ATTACHMENT_MODAL:
            return {
                modal: action.payload,
            };
        default:
            return state;
    }
};
