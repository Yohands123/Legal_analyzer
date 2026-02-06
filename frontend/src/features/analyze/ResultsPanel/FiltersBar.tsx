import { SearchInput } from "../../../components/SearchInput";

type FiltersBarProps = {
  severity: string;
  onSeverityChange: (value: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
};

export const FiltersBar = ({
  severity,
  onSeverityChange,
  query,
  onQueryChange,
}: FiltersBarProps) => {
  return (
    <div className="filters-bar">
      <div className="filter-group">
        {["all", "high", "medium", "low"].map((level) => (
          <button
            key={level}
            className={`filter-pill ${severity === level ? "active" : ""}`}
            type="button"
            onClick={() => onSeverityChange(level)}
          >
            {level}
          </button>
        ))}
      </div>
      <SearchInput value={query} onChange={onQueryChange} placeholder="Search risks" />
    </div>
  );
};
