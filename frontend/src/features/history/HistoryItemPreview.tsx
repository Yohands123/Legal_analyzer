import { HistoryEntry, formatHistoryLabel } from "../../state/historyStore";

type HistoryItemPreviewProps = {
  entry: HistoryEntry;
};

export const HistoryItemPreview = ({ entry }: HistoryItemPreviewProps) => {
  return (
    <div className="history-card">
      <strong>{entry.filename}</strong>
      <span className="muted">{formatHistoryLabel(entry)}</span>
    </div>
  );
};
