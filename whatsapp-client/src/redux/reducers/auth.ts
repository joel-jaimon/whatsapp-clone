import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setSocketConnectionSuccess: (state) => {
      state.socketStatus = true;
    },
    setAuthSuccess: (state, action) => {
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
} = authSlice.actions;
