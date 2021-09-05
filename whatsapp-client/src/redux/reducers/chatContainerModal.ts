import { createSlice } from "@reduxjs/toolkit";
// import { chatContainerModalTypes } from "../types/chatContainerModal";

const initialState = {
    modal: null,
};

export const chatContainerModalSlice = createSlice({
    name: "chatContainerModalReducer",
    initialState,
    reducers: {
        setChatContainerModal: (state, action) => {
            state.modal = action.payload;
        },
    },
});

export const { setChatContainerModal } = chatContainerModalSlice.actions;

// export const chatContainerModalReducers = (
//     state = initialState,
//     action: any
// ) => {
//     switch (action.type) {
//         case chatContainerModalTypes.SET_CHAT_CONTAINER_MODAL:
//             return {
//                 modal: action.payload,
//             };
//         default:
//             return state;
//     }
// };
