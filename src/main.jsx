import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import AIChat from "./components/AIChat/AIChat";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "./Context";

const routes = [
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/AI", element: <AIChat /> },
      {
        path: "/login-register",
        element: <LoginRegister />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider>
    <RouterProvider router={router} />
  </Provider>
);
