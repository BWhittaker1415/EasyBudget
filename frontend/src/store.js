import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import pinnedBarReducer from "./slices/pinnedBarSlice";
import { budgetApiSlice } from "./slices/budgetApiSlice";
import { transactionApiSlice } from "./slices/transactionApiSlice";
import { usersApiSlice } from "./slices/usersApiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    pinnedBars: pinnedBarReducer,
    [budgetApiSlice.reducerPath]: budgetApiSlice.reducer,
    [transactionApiSlice.reducerPath]: transactionApiSlice.reducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      budgetApiSlice.middleware,
      transactionApiSlice.middleware,
      usersApiSlice.middleware
    ),
  devTools: true,
});

export default store;
