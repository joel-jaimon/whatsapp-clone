import { chatContainerModalTypes } from "../types/chatContainerModal";

const initialState = {
    modal: null,
};

export const chatContainerModalReducers = (
    state = initialState,
    action: any
) => {
    switch (action.type) {
        case chatContainerModalTypes.SET_CHAT_CONTAINER_MODAL:
            return {
                modal: action.payload,
            };
        default:
            return state;
    }
};
