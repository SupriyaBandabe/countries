import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "./App";
import Home from "./components/Home";
import CountryDetail from "./components/CountryDetail";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:country",
        element: <CountryDetail />,
      },
    ],
  },
]);

let container = document.getElementById("app");
let root = createRoot(container);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>
);
