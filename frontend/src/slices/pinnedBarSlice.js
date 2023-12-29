import { createSlice } from "@reduxjs/toolkit";

const pinnedBarSlice = createSlice({
  name: "pinnedBars",
  initialState: [],
  reducers: {
    setPinnedBudgets: (state, action) => action.payload,

    pinBar: (state, action) => {
      if (!state.some((budget) => budget.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    unpinBar: (state, action) => {
      return state.filter((budget) => budget.id !== action.payload.id);
    },
  },
});

export const { setPinnedBudgets, pinBar, unpinBar } = pinnedBarSlice.actions;
export default pinnedBarSlice.reducer;
