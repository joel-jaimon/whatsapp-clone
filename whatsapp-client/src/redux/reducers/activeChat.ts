import { activeChatTypes } from "../types/activeChatTypes";
import info from "../../data/temp/chats/chats.json";
import chat from "../../data/temp/chats/data/8bc44bbe-b4b0-492a-82d3-33de98251aa6.json";

const initialState = {
    chat: {
        chatInfo: info[0],
        messages: chat,
    },
};

export const chatReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case activeChatTypes.SET_ACTIVE_CHAT:
            return {
                chat: action.payload,
            };
        default:
            return state;
    }
};
