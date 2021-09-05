import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modal: null,
};

export const movableModalSlice = createSlice({
    name: "movableModalReducer",
    initialState,
    reducers: {
        setMovalbleModal: (state, action) => {
            state.modal = action.payload;
        },
    },
});

export const { setMovalbleModal } = movableModalSlice.actions;
