import { sidebarChatModalTypes } from "../types/sidebarModal";

const initialState = {
    modal: null,
};

export const sidebarChatModalReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case sidebarChatModalTypes.SET_SIDEBAR_CHAT_MODAL:
            return {
                modal: action.payload,
            };
        default:
            return state;
    }
};
