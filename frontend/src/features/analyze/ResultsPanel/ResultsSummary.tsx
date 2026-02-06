import { useAnalyzeStore } from "../../../state/analyzeStore";

export const ResultsSummary = () => {
  const { state } = useAnalyzeStore();
  return (
    <div className="results-summary">
      <div>
        <h2>{state.filename || "No document loaded"}</h2>
        <p className="muted">
          {state.jobId
            ? `Job #${state.jobId} • ${state.risks.length} risks • ${state.actions.length} actions`
            : "Upload a PDF to begin analysis."}
        </p>
      </div>
      <div className="metric-row">
        <div className="metric-card">
          <span>Risks</span>
          <strong>{state.risks.length}</strong>
        </div>
        <div className="metric-card">
          <span>Actions</span>
          <strong>{state.actions.length}</strong>
        </div>
      </div>
    </div>
  );
};
