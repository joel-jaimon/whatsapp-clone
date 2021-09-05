import { createSlice } from "@reduxjs/toolkit";
// import { globalModalTypes } from "../types/globalModalTypes";

const initialState = {
    modal: null,
    msgInFocus: null,
};

export const globalModalSlice = createSlice({
    name: "globalModalReducer",
    initialState,
    reducers: {
        setGlobalModal: (state, action) => {
            state.modal = action.payload;
        },
        setGlobalMsgInFocus: (state, action) => {
            state.msgInFocus = action.payload;
        },
    },
});

export const { setGlobalModal, setGlobalMsgInFocus } = globalModalSlice.actions;

// const globalModalReducer = (state = initialState, action: any) => {
//     switch (action.type) {
//         case globalModalTypes.SET_GLOBAL_MODAL:
//             return {
//                 ...state,
//                 modal: action.payload,
//             };
//         case globalModalTypes.SET_MSG_IN_FOCUS:
//             return {
//                 ...state,
//                 msgInFocus: action.payload,
//             };
//         default:
//             return state;
//     }
// };
// export default globalModalReducer;
