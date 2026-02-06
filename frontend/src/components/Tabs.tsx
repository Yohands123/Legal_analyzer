type TabOption = {
  id: string;
  label: string;
};

type TabsProps = {
  options: TabOption[];
  value: string;
  onChange: (id: string) => void;
};

export const Tabs = ({ options, value, onChange }: TabsProps) => {
  return (
    <div className="tabs">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={`tab ${value === option.id ? "active" : ""}`}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
