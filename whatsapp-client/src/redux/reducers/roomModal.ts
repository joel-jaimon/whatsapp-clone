import { createSlice } from "@reduxjs/toolkit";
// import { roomModalTypes } from "../types/roomModalTypes";

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

// export const roomModalReducer = (state = initialState, action: any) => {
//     switch (action.type) {
//         case roomModalTypes.SET_ROOM_MODAL:
//             return {
//                 ...state,
//                 modal: action.payload,
//             };
//         default:
//             return state;
//     }
// };
