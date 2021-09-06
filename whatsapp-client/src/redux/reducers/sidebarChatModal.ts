import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: null,
};

export const sidebarChatModalSlice = createSlice({
  name: "sidebarChatModalReducer",
  initialState,
  reducers: {
    setSidebarModal: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { setSidebarModal } = sidebarChatModalSlice.actions;
