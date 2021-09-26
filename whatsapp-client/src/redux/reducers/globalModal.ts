import { createSlice } from "@reduxjs/toolkit";

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
