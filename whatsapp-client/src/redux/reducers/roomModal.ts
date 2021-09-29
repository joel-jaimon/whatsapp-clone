import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: null,
  newConnection: null,
};

export const roomModalSlice = createSlice({
  name: "roomModalReducer",
  initialState,
  reducers: {
    setRoomModal: (state, action) => {
      state.modal = action.payload;
    },

    setNewConnection: (state, action) => {
      state.newConnection = action.payload;
    },
  },
});

export const { setRoomModal, setNewConnection } = roomModalSlice.actions;
