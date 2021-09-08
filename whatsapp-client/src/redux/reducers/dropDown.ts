import { createSlice } from "@reduxjs/toolkit";

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
