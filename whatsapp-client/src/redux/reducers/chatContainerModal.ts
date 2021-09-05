import { createSlice } from "@reduxjs/toolkit";

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
