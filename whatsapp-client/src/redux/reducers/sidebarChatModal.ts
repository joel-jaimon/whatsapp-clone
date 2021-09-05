import { createSlice } from "@reduxjs/toolkit";
// import { sidebarChatModalTypes } from "../types/sidebarModal";

const initialState = {
    modal: null,
};

export const sidebarChatModalSlice = createSlice({
    name: "sidebarChatModalReducer",
    initialState,
    reducers: {
        setSidebarModal: (state, action) => {
            state.modal = action.payload;
        },
    },
});

export const { setSidebarModal } = sidebarChatModalSlice.actions;

// export const sidebarChatModalReducers = (state = initialState, action: any) => {
//     switch (action.type) {
//         case sidebarChatModalTypes.SET_SIDEBAR_CHAT_MODAL:
//             return {
//                 modal: action.payload,
//             };
//         default:
//             return state;
//     }
// };
