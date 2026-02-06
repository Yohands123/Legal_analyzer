import { SelectedItem } from "../../../state/analyzeStore";

type DetailBodyProps = {
  item: Exclude<SelectedItem, null>;
};

export const DetailBody = ({ item }: DetailBodyProps) => {
  return (
    <div className="detail-block">
      <h5>Why it matters</h5>
      <p>{item.type === "risk" ? item.item.summary : item.item.why}</p>
    </div>
  );
};
