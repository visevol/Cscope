import MainLayout from "./layout/MainLayout";
import ChangeVolumePage from "./pages/ChangeVolumePage";
import DevelopersInputPage from "./pages/DevelopersInputPage";
import HistoryFileCommitPage from "./pages/HistoryFileCommitPage";
import StartProjectPage from "./pages/StartProjectPage";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "repository/:id",
    element: <MainLayout />,
    children: [
      { path: "change-volume", element: <ChangeVolumePage /> },
      { path: "history-file", element: <HistoryFileCommitPage /> },
      { path: "developers-input", element: <DevelopersInputPage /> },
    ],
  },
  {
    path: "/",
    element: <StartProjectPage />,
  },
];

export default routes;
