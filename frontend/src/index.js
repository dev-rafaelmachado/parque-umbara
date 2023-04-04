import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Safekids from "./pages/Safekids";
import Manager from "./pages/Manager";

import "./index.css";

function Index() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/sign",
          element: <Sign />,
        },
        {
          path: "/safekids",
          element: <Safekids />,
        },
        {
          path: "/manager",
          element: <Manager />,
        },
      ])}
    ></RouterProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
