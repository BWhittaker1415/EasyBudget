import Transaction from "../../../backend/models/transactionModel";
import { apiSlice } from "./apiSlice";
const TRANSACTIONS_URL = "/api/transactions";

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query: (transaction) => ({
        url: `${TRANSACTIONS_URL}/create`,
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: [Transaction],
      onSuccess: (result, variables, api) => {
        const createdTransaction = result.data;
        api.dispatch(transactionApiSlice.endpoints.getTransaction.initiate());
      },
    }),

    getTransaction: builder.query({
      query: () => ({
        url: TRANSACTIONS_URL,
        method: "GET",
      }),
      providesTags: ["Transaction"],
      keepUnusedDataFor: 5,
    }),

    getTransactionDetails: builder.query({
      query: (transactionId) => ({
        url: `${TRANSACTIONS_URL}/${transactionId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateTransaction: builder.mutation({
      query: (data) => ({
        url: `${TRANSACTIONS_URL}/${data.transactionId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),

    deleteTransaction: builder.mutation({
      query: (transactionId) => ({
        url: `${TRANSACTIONS_URL}/${transactionId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTransactionMutation,
  useGetTransactionQuery,
  useGetTransactionDetailsQuery,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} = transactionApiSlice;
