import { Risk } from "../../../types/risk";
import { Card } from "../../../components/Card";
import { Badge } from "../../../components/Badge";
import { EmptyState } from "../../../components/EmptyState";
import { useAnalyzeStore } from "../../../state/analyzeStore";
import { severityRank } from "../../../utils/formatters";

type RiskListProps = {
  risks: Risk[];
};

export const RiskList = ({ risks }: RiskListProps) => {
  const { dispatch } = useAnalyzeStore();
  if (!risks.length) {
    return <EmptyState title="No risks yet" subtitle="Run an analysis to populate risks." />;
  }

  const sorted = [...risks].sort((a, b) => severityRank(b.severity) - severityRank(a.severity));

  return (
    <div className="card-list">
      {sorted.map((risk, index) => (
        <Card
          key={`${risk.summary}-${index}`}
          className="risk-card fade-in"
          onClick={() => dispatch({ type: "setSelected", payload: { type: "risk", item: risk } })}
        >
          <div className="card-head">
            <Badge label={risk.severity} tone={risk.severity} />
            <span className="card-meta">Risk</span>
          </div>
          <h4>{risk.summary}</h4>
          <p className="muted">{risk.clause_text.slice(0, 160)}...</p>
        </Card>
      ))}
    </div>
  );
};
