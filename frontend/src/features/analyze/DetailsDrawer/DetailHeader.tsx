import { Badge } from "../../../components/Badge";
import { SelectedItem } from "../../../state/analyzeStore";

type DetailHeaderProps = {
  item: Exclude<SelectedItem, null>;
};

export const DetailHeader = ({ item }: DetailHeaderProps) => {
  const label = item.type === "risk" ? item.item.summary : item.item.title;
  const tone = item.type === "risk" ? item.item.severity : item.item.priority;
  return (
    <div className="detail-block">
      <h4>{label}</h4>
      <Badge label={tone} tone={tone as "high" | "medium" | "low"} />
    </div>
  );
};
