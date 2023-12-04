import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("budget")
  ? JSON.parse(localStorage.getItem("budget"))
  : { budgetItems: [] };

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addToBudget: (state, action) => {
      const item = action.payload;

      const existItem = state.budgetItems.find((x) => x._id === item._id);

      if (existItem) {
        state.budgetItems = state.budgetItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.budgetItems = [...state.budgetItems, item];
      }

      localStorage.setItem("budget", JSON.stringify(state));
    },
  },
});

export const { addToBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
