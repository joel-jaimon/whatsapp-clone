import { createSlice } from "@reduxjs/toolkit";
// import { movalbleModalTypes } from "../types/movableModalTypes";

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

// export const movableModalReducers = (state = initialState, action: any) => {
//     switch (action.type) {
//         case movalbleModalTypes.SET_MOVALBLE_MODAL:
//             return {
//                 ...state,
//                 modal: action.payload,
//             };
//         default:
//             return state;
//     }
// };
