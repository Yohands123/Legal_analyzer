import { Outlet, NavLink } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { AnalyzeProvider } from "../../state/analyzeStore";
import { HistoryProvider } from "../../state/historyStore";

export const AppShell = () => {
  return (
    <AnalyzeProvider>
      <HistoryProvider>
        <div className="app-shell">
          <PageHeader />
          <div className="nav-bar">
            <NavLink to="/analyze" className="nav-link">
              Analyze
            </NavLink>
            <NavLink to="/history" className="nav-link">
              History
            </NavLink>
            <NavLink to="/compare" className="nav-link">
              Compare
            </NavLink>
          </div>
          <Outlet />
        </div>
      </HistoryProvider>
    </AnalyzeProvider>
  );
};
