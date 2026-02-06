import { useHistoryStore } from "../../state/historyStore";
import { HistoryItemPreview } from "./HistoryItemPreview";
import { EmptyState } from "../../components/EmptyState";

export const HistoryList = () => {
  const { entries, clear } = useHistoryStore();
  if (!entries.length) {
    return <EmptyState title="No history yet" subtitle="Run an analysis to populate history." />;
  }
  return (
    <div className="history-list">
      <div className="history-actions">
        <button className="ghost-btn" type="button" onClick={clear}>
          Clear history
        </button>
      </div>
      {entries.map((entry) => (
        <HistoryItemPreview key={entry.jobId} entry={entry} />
      ))}
    </div>
  );
};
