import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modal: null,
};

export const roomModalSlice = createSlice({
    name: "roomModalReducer",
    initialState,
    reducers: {
        setRoomModal: (state, action) => {
            state.modal = action.payload;
        },
    },
});

export const { setRoomModal } = roomModalSlice.actions;
