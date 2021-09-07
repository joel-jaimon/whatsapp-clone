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
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { initiateSignin, setAuthSuccess, setAuthFailed } =
  authSlice.actions;
