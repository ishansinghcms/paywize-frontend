import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import AIChat from "./components/AIChat/AIChat";
import LoginRegister, {
  action,
} from "./components/LoginRegister/LoginRegister";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/AI", element: <AIChat /> },
      { path: "/login-register", element: <LoginRegister />, action: action },
    ],
  },
];
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
