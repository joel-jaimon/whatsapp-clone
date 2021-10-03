import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  onCall: false,
  ringing: false,
  incomingCall: false,
  callerInfo: {
    active: false,
    displayName: "James Veeler",
    avatar:
      "https://images.unsplash.com/photo-1628191140046-8be8856fd011?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
};

export const callerInfoSlice = createSlice({
  name: "roomReducer",
  initialState,
  reducers: {
    initCall: (state, action: PayloadAction<any>) => {},

    callingActive: (state, action: PayloadAction<any>) => {
      state.onCall = true;
    },

    callConnected: (state, action: PayloadAction<any>) => {
      state.ringing = true;
      //@ts-ignore
      state.callerInfo = {};
    },

    othersCalling: (state, action: PayloadAction<any>) => {
      state.incomingCall = true;
      state.callerInfo = action.payload;
    },

    rejectCall: (state, action: PayloadAction<any>) => {
      state.onCall = false;
      state.ringing = false;
      state.incomingCall = false;
      //@ts-ignore
      state.callerInfo = {};
    },
  },
});

export const {
  rejectCall,
  callConnected,
  othersCalling,
  initCall,
  callingActive,
} = callerInfoSlice.actions;
