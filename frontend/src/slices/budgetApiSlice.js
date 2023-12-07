import Budget from "../../../backend/models/budgetModel";
import { apiSlice } from "./apiSlice";
const BUDGETS_URL = "/api/budgets";

export const budgetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (budget) => ({
        url: `${BUDGETS_URL}/create`,
        method: "POST",
        body: budget,
      }),
      invalidatesTags: [Budget],
      onSuccess: (result, variables, api) => {
        const createdBudget = result.data;
        api.dispatch(budgetApiSlice.endpoints.getBudget.initiate());
      },
    }),
    getBudget: builder.query({
      query: () => ({
        url: BUDGETS_URL,
        method: "GET",
      }),
    }),
    updateBudget: builder.mutation({
      query: (data) => ({
        url: `${BUDGETS_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Budget"],
    }),
  }),
});

export const { useCreateMutation, useGetBudgetQuery, useUpdateBudgetMutation } =
  budgetApiSlice;
