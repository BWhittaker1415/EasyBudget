import { BUDGET_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const budgetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBudgets: builder.query({
      query: () => ({
        url: BUDGET_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetBudgetsQuery } = budgetApiSlice;
