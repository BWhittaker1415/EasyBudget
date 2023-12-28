import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  pinnedBudgets: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearCredentials: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    setPinnedBudgets: (state, action) => {
      state.pinnedBudgets = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setPinnedBudgets } =
  authSlice.actions;

export default authSlice.reducer;
