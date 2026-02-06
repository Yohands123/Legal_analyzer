type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  return (
    <input
      className="ghost-input"
      type="search"
      value={value}
      placeholder={placeholder || "Search"}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
