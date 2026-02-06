import { useMemo, useState } from "react";
import { useAnalyzeStore } from "../../../state/analyzeStore";
import { ResultsSummary } from "./ResultsSummary";
import { FiltersBar } from "./FiltersBar";
import { ResultsTabs } from "./ResultsTabs";
import { RiskList } from "./RiskList";
import { ActionList } from "./ActionList";
import { ClauseList } from "./ClauseList";

export const ResultsPanel = () => {
  const { state } = useAnalyzeStore();
  const [activeTab, setActiveTab] = useState("risks");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filteredRisks = useMemo(() => {
    return state.risks.filter((risk) => {
      const severityMatch = severityFilter === "all" || risk.severity === severityFilter;
      const queryMatch = risk.summary.toLowerCase().includes(query.toLowerCase());
      return severityMatch && queryMatch;
    });
  }, [state.risks, severityFilter, query]);

  return (
    <main className="panel panel-results">
      <ResultsSummary />
      <FiltersBar
        severity={severityFilter}
        onSeverityChange={setSeverityFilter}
        query={query}
        onQueryChange={setQuery}
      />
      <ResultsTabs value={activeTab} onChange={setActiveTab} />
      <div className="results-body">
        {activeTab === "risks" && <RiskList risks={filteredRisks} />}
        {activeTab === "actions" && <ActionList actions={state.actions} />}
        {activeTab === "clauses" && <ClauseList />}
      </div>
    </main>
  );
};
