type EmptyStateProps = {
  title: string;
  subtitle?: string;
};

export const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      {subtitle && <p className="muted">{subtitle}</p>}
    </div>
  );
};
