import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: null,
  newConnection: null,
  disconnectCall: false,
  micStatus: true,
  videoStatus: true,
};

export const roomModalSlice = createSlice({
  name: "roomModalReducer",
  initialState,
  reducers: {
    setRoomModal: (state, action) => {
      state.disconnectCall = false;
      state.modal = action.payload;
    },

    setNewConnection: (state, action) => {
      state.newConnection = action.payload;
    },

    disconnectFromCall: (state) => {
      state.disconnectCall = true;
    },

    toggleVideo: (state, action) => {
      state.videoStatus = action.payload;
    },

    toggleAudio: (state, action) => {
      state.micStatus = action.payload;
    },

    resetRoomModal: (state) => {
      state.modal = null;
      state.newConnection = null;
      state.disconnectCall = false;
      state.micStatus = true;
      state.videoStatus = true;
    },
  },
});

export const {
  setRoomModal,
  setNewConnection,
  disconnectFromCall,
  toggleVideo,
  toggleAudio,
  resetRoomModal,
} = roomModalSlice.actions;
