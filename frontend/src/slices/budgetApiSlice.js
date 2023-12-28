import Budget from "../../../backend/models/budgetModel";
import { apiSlice } from "./apiSlice";
const BUDGETS_URL = "/api/budgets";

export const budgetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBudget: builder.mutation({
      query: (budget) => ({
        url: `${BUDGETS_URL}/create`,
        method: "POST",
        body: budget,
      }),
      invalidatesTags: ["Budget"],
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
      providesTags: ["Budget"],
      keepUnusedDataFor: 5,
    }),

    getBudgetDetails: builder.query({
      query: (budgetId) => ({
        url: `${BUDGETS_URL}/${budgetId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateBudget: builder.mutation({
      query: (data) => ({
        url: `${BUDGETS_URL}/${data.budgetId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Budget"],
    }),

    deleteBudget: builder.mutation({
      query: (budgetId) => ({
        url: `${BUDGETS_URL}/${budgetId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateBudgetMutation,
  useGetBudgetQuery,
  useGetBudgetDetailsQuery,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
} = budgetApiSlice;
