import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

// baseUrl is an empty '' because I have a proxy already set up in "vite.config.js"
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Budget", "Account", "Transaction"],
  endpoints: (builder) => ({}),
});
