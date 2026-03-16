import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/landing";
import { MainApp } from "./pages/main-app";
import { NotFound } from "./pages/not-found";
import { ChatPage } from "./pages/chat-page";

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
    path: "/chat",
    Component: ChatPage,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);