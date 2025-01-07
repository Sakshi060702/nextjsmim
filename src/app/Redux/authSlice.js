"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  tokenExpiry: null,
  userType: null,
};

// Helper function to load data from localStorage in the browser
const loadFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return {
      token: localStorage.getItem("state_token"),
      isAuthenticated: JSON.parse(localStorage.getItem("state_isAuthenticated")) || false,
      tokenExpiry: localStorage.getItem("state_tokenExpiry"),
      userType: localStorage.getItem("state_userType"),
    };
  }
  return initialState;
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadFromLocalStorage(),
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.tokenExpiry = action.payload.tokenExpiry;

      if (typeof window !== "undefined") {
        localStorage.setItem("state_token", state.token);
        localStorage.setItem("state_isAuthenticated", state.isAuthenticated);
        localStorage.setItem("state_tokenExpiry", state.tokenExpiry);
      }
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("state_userType", action.payload);
      }
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.tokenExpiry = null;
      state.userType = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("state_token");
        localStorage.removeItem("state_isAuthenticated");
        localStorage.removeItem("state_tokenExpiry");
        localStorage.removeItem("state_userType");
      }
    },
  },
});

export const { loginSuccess, setUserType, logout } = authSlice.actions;
export default authSlice.reducer;
