import { sidebarChatModalTypes } from "../types/sidebarModal";

const initialState = {};

export const sidebarChatModalReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case sidebarChatModalTypes.SET_SIDEBAR_CHAT_MODAL:
            return {
                sidebarModal: action.payload,
            };
        default:
            return state;
    }
};
