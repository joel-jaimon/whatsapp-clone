import { createSlice } from "@reduxjs/toolkit";
// import { dropDownTypes } from "../types/dropDownTypes";

const initialState = {
    dropDown: "",
};

export const dropDownSlice = createSlice({
    name: "dropDownReducer",
    initialState,
    reducers: {
        setDropDown: (state, action) => {
            state.dropDown = action.payload;
        },
    },
});

export const { setDropDown } = dropDownSlice.actions;

// const dropDownReducer = (state = initialState, action: any) => {
//     switch (action.type) {
//         case dropDownTypes.SET_DROP_DOWN:
//             return {
//                 dropDown: action.payload,
//             };
//         default:
//             return state;
//     }
// };

// export default dropDownReducer;
