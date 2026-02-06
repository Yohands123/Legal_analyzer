import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "./shell/AppShell";
import { AnalyzePage } from "../features/analyze/AnalyzePage";
import { HistoryPage } from "../features/history/HistoryPage";
import { ComparePage } from "../features/compare/ComparePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/analyze" replace /> },
      { path: "analyze", element: <AnalyzePage /> },
      { path: "history", element: <HistoryPage /> },
      { path: "compare", element: <ComparePage /> },
    ],
  },
]);
