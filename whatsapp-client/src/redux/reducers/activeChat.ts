import { activeChatTypes } from "../types/activeChatTypes";
import info from "../../data/temp/chats/chats.json";
import chat from "../../data/temp/chats/data/8bc44bbe-b4b0-492a-82d3-33de98251aa6.json";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    chat: {
        chatInfo: info[0],
        messages: chat,
    },
};

export const chatSlice = createSlice({
    name: "chatReducer",
    initialState,
    reducers: {
        setActiveChat: (state, action: PayloadAction<any>) => {
            state.chat = action.payload;
        },
    },
});

export const { setActiveChat } = chatSlice.actions;
export default chatSlice;

// export const chatReducer = (state = initialState, action: any) => {
//     switch (action.type) {
//         case activeChatTypes.SET_ACTIVE_CHAT:
//             return {
//                 chat: action.payload,
//             };
//         default:
//             return state;
//     }
// };
