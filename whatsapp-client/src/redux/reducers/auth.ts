import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    initiateSignin: (state, action) => {
      state.loading = true;
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
    },

    logout: (state) => {
      state.auth = null;
      state.loading = false;
      state.error = null;
      window.location.reload();
    },
  },
});

export const { initiateSignin, setAuthSuccess, setAuthFailed, logout } =
  authSlice.actions;
