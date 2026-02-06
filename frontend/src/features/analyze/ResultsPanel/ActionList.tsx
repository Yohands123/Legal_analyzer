import { ActionItem } from "../../../types/actionItem";
import { Card } from "../../../components/Card";
import { Badge } from "../../../components/Badge";
import { EmptyState } from "../../../components/EmptyState";
import { useAnalyzeStore } from "../../../state/analyzeStore";

type ActionListProps = {
  actions: ActionItem[];
};

export const ActionList = ({ actions }: ActionListProps) => {
  const { dispatch } = useAnalyzeStore();
  if (!actions.length) {
    return <EmptyState title="No action items yet" subtitle="Actions appear after analysis." />;
  }

  return (
    <div className="card-list">
      {actions.map((action, index) => (
        <Card
          key={`${action.title}-${index}`}
          className="action-card fade-in"
          onClick={() => dispatch({ type: "setSelected", payload: { type: "action", item: action } })}
        >
          <div className="card-head">
            <Badge label={action.priority} tone={action.priority} />
            <span className="card-meta">Action item</span>
          </div>
          <h4>{action.title}</h4>
          <p className="muted">{action.why}</p>
        </Card>
      ))}
    </div>
  );
};
