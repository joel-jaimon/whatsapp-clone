import { createSlice } from "@reduxjs/toolkit";
import { AuthStateType, AuthUserType } from "types/authSlice.types";

const initialState: AuthStateType = {
  auth: null,
  loading: true,
  error: null,
  socketStatus: false,
};

export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    initiateSignin: (state, action) => {
      state.loading = true;
    },

    initAuthuserInfoUpdate: (state, action) => {
      state.auth!.loading = true;
    },

    authuserInfoUpdateSuccessfull: (state, action) => {
      state.auth = { ...state.auth, ...action.payload };
      state.auth!.loading = false;
    },

    authuserInfoUpdateFailed: (state, action) => {
      state.auth!.loading = false;
    },

    setSocketConnectionSuccess: (state) => {
      state.socketStatus = true;
    },
    setAuthSuccess: (state, action: { payload: AuthUserType }) => {
      state.auth = action.payload;
      state.error = null;
      state.loading = false;
    },
    setAuthFailed: (state, action) => {
      state.auth = null;
      state.error = action.payload;
      state.loading = false;
      state.socketStatus = false;
    },

    initiateLogout: (state) => {
      state.auth = null;
      state.loading = true;
      //@ts-ignore
      state.error = "Logging Out...";
    },

    socketDisconnected: (state) => {
      state.socketStatus = false;
    },

    logout: (state) => {
      window.location.reload();
    },
  },
});

export const {
  initiateSignin,
  setAuthSuccess,
  setAuthFailed,
  logout,
  setSocketConnectionSuccess,
  initiateLogout,
  socketDisconnected,
  initAuthuserInfoUpdate,
  authuserInfoUpdateSuccessfull,
  authuserInfoUpdateFailed,
} = authSlice.actions;
