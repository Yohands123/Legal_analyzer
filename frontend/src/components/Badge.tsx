type BadgeProps = {
  label: string;
  tone?: "high" | "medium" | "low" | "neutral";
};

export const Badge = ({ label, tone = "neutral" }: BadgeProps) => {
  return <span className={`badge badge-${tone}`}>{label}</span>;
};
