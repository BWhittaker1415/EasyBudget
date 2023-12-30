import { createSlice } from "@reduxjs/toolkit";

const pinnedBarSlice = createSlice({
  name: "pinnedBars",
  initialState: [],
  reducers: {
    setPinnedBudgets: (state, action) => action.payload,
    pinBar: (state, action) => {
      const budgetId = action.payload;
      if (!state.includes(budgetId)) {
        state.push(budgetId);
      }
    },
    unpinBar: (state, action) => {
      return state.filter((id) => id !== action.payload);
    },
  },
});

export const { setPinnedBudgets, pinBar, unpinBar } = pinnedBarSlice.actions;
export default pinnedBarSlice.reducer;
