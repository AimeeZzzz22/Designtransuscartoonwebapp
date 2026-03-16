import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/landing";
import { MainApp } from "./pages/main-app";
import { NotFound } from "./pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/app",
    Component: MainApp,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);