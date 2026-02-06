type ResultsTabsProps = {
  value: string;
  onChange: (value: string) => void;
};

export const ResultsTabs = ({ value, onChange }: ResultsTabsProps) => {
  return (
    <div className="results-tabs">
      {[
        { id: "risks", label: "Risks" },
        { id: "actions", label: "Actions" },
        { id: "clauses", label: "Clauses" },
      ].map((tab) => (
        <button
          key={tab.id}
          className={`tab ${value === tab.id ? "active" : ""}`}
          type="button"
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
