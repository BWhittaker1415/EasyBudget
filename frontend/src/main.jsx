import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import PrivateRoute from "./components/PrivateRoute.jsx";
import WelcomeScreen from "./screens/WelcomeScreen.jsx";

import Dashboard from "./screens/Dashboard.jsx";

import Accounts from "./screens/accountScreens/AccountScreen.jsx";

import Budgets from "./screens/budgetScreens/BudgetScreen.jsx";
import CreateBudgets from "./screens/budgetScreens/BudgetCreateScreen.jsx";
import BudgetEdit from "./screens/budgetScreens/BudgetEditScreen.jsx";
import BudgetDetail from "./screens/budgetScreens/BudgetDetailScreen.jsx";

import Transaction from "./screens/transactionScreens/TransactionScreen.jsx";

import LoginScreen from "./screens/LoginScreen.jsx";

import RegisterScreen from "./screens/RegisterScreen.jsx";

import ProfileScreen from "./screens/ProfileScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      {/* PRIVATE ROUTES */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/accounts" element={<Accounts />} />

        <Route path="/budgets" element={<Budgets />} />
        <Route path="/budgets/:id" element={<BudgetDetail />} />
        <Route path="/budgets/:id/edit" element={<BudgetEdit />} />
        <Route path="/budgets/create" element={<CreateBudgets />} />

        <Route path="/transactions" element={<Transaction />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
