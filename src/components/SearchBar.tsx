interface SearchBarProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export default function SearchBar({
  searchTerm,
  onChange,
  onReset,
}: SearchBarProps) {
  return (
    <div>
      <p>Search</p>
      <p>
        Searching for: <span>{searchTerm}</span>
      </p>
      <input
        style={{ border: "1px solid black" }}
        onChange={onChange}
        value={searchTerm}
      />
      <button onClick={onReset}>Reset Search</button>
    </div>
  );
}

