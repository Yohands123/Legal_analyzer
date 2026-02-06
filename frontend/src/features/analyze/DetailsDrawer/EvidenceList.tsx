import { SelectedItem } from "../../../state/analyzeStore";

type EvidenceListProps = {
  item: Exclude<SelectedItem, null>;
};

export const EvidenceList = ({ item }: EvidenceListProps) => {
  return (
    <div className="detail-block">
      <h5>Evidence</h5>
      <p className="muted">{item.item.clause_text}</p>
    </div>
  );
};
