import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    dashboard: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/dashboard`,
        method: "GET",
        body: data,
      }),
    }),
    accounts: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/accounts`,
        method: "GET",
        body: data,
      }),
    }),
    budgets: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/budgets`,
        method: "GET",
        body: data,
      }),
    }),
    history: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/history`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useDashboardMutation,
  useAccountsMutation,
  useBudgetsMutation,
  useHistoryMutation,
} = usersApiSlice;
