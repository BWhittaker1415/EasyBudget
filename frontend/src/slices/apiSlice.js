import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { build } from "vite";

// baseUrl is an empty '' because I have a proxy already set up in "vite.config.js"
const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
