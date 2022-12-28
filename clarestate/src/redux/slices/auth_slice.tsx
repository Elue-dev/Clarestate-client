import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

const auth_slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    REMOVE_ACTIVE_USER: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
    SET_USER_TOKEN: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, SET_USER_TOKEN } =
  auth_slice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const getUser = (state: RootState) => state.auth.user;
export const getUserToken = (state: RootState) => state.auth.token;

export default auth_slice.reducer;
